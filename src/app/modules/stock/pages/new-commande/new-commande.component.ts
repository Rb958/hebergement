import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommandeService} from "../../../../shared/services/services/commandeService";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {LigneCommandeModel} from "../../../../shared/models/entity/ligne-commande.model";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {CommandeModel} from "../../../../shared/models/entity/commande.model";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";
import {ActivatedRoute} from "@angular/router";
import {FournisseurParticulierModel} from "../../../../shared/models/entity/fournisseur-particulier.model";
import {FournisseurEntrepriseModel} from "../../../../shared/models/entity/fournisseur-entreprise.model";
import {ArticleModel} from "../../../../shared/models/entity/article.model";
import {ArticleService} from "../../../../shared/services/services/article.service";
import {FournisseurService} from "../../../../shared/services/services/fournisseur.service";

@Component({
  selector: 'app-new-commande',
  templateUrl: './new-commande.component.html',
  styleUrls: ['./new-commande.component.scss']
})
export class NewCommandeComponent implements OnInit {

  commandForm: FormGroup = {} as FormGroup;
  ligneCmdForm: FormGroup = {} as FormGroup;
  lignesCommande = new Array<LigneCommandeModel>();
  isEdition = false;
  totalPrice: number = 0;
  currentCommande: CommandeModel = {} as CommandeModel;
  currentCommandeId: any = 0;
  isEnterprise = true;
  fournisseursParticuliers: Array<FournisseurParticulierModel> = [];
  fournisseursEntreprise: Array<FournisseurEntrepriseModel> = [];
  articles: Array<ArticleModel> = [];

  constructor(
    private fb: FormBuilder,
    private commandeService: CommandeService,
    private articleService: ArticleService,
    private fournisseurService: FournisseurService,
    private activatedRoute: ActivatedRoute,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.has('id')){
      this.isEdition = true;
      this.currentCommandeId = this.activatedRoute.snapshot.paramMap.get('id');
      this.commandeService.findById(this.currentCommandeId).subscribe(
        apiResponse => {
          if (apiResponse.code == 200){
            this.currentCommande = apiResponse.result;
            this.initCmdForm(apiResponse.result);
            this.lignesCommande = this.currentCommande.ligneCommande;
          }else{
            this.notifierService.notify(
              'Erreur lors de la recupération des données de cette commande',
              'Erreur',
              NotificationType.ERROR
            );
          }
        },
        error => {
          this.notifierService.notify(
            'Erreur lors de la recupération des données de cette commande',
            'Erreur',
            NotificationType.ERROR
          );
        }
      );
    }else{
      this.initCmdForm();
      this.initLigneCmdForm();
    }
    this.loadArticles();
    this.loadFournisseurs();
  }

  initCmdForm(command? : CommandeModel) {
    if (command){
      this.isEnterprise = command.fournisseurEntreprise ? true :false;
      this.commandForm = this.fb.group({
        demandeur: [command?.demandeur, Validators.required],
        dateLivraison: [command?.dateLivraison],
        fournisseurEntreprise: this.fb.group({
          id: [command?.fournisseurEntreprise?.id]
        }),
        fournisseurParticulier: this.fb.group({
          id: [command?.fournisseurParticulier?.id]
        })
      });
    }else {
      this.commandForm = this.fb.group({
        demandeur: ['', Validators.required],
        dateLivraison: [''],
        fournisseurEntreprise: this.fb.group({
          id: ['']
        }),
        fournisseurParticulier: this.fb.group({
          id: ['']
        })
      });
    }
  }

  private initLigneCmdForm(ligneCommande?: LigneCommandeModel) {
    if (ligneCommande){
      this.ligneCmdForm = this.fb.group({
        article: this.fb.group({
          id: [ligneCommande?.article?.id, Validators.required]
        }),
        qte: [ligneCommande?.qte, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        prixUnitaire: [ligneCommande?.prixUnitaire, [Validators.required, Validators.pattern(/^[0-9]+$/)]]
      });
    }else {
      this.ligneCmdForm = this.fb.group({
        article: this.fb.group({
          id: ['', Validators.required]
        }),
        qte: [0, [Validators.required, Validators.pattern(/^[1-9][0-9]+$/)]],
        prixUnitaire: [0, [Validators.required, Validators.pattern(/^[1-9][0-9]+$/)]]
      });
    }
  }

  addLigneCommande(){
    if (this.ligneCmdForm.valid){
      const ligneCommande = new LigneCommandeModel();
      ligneCommande.qte = this.ligneCmdForm.value.qte;
      ligneCommande.prixUnitaire = this.ligneCmdForm.value.prixUnitaire;
      const tmpArticle = this.articles.filter(article => article.id = this.ligneCmdForm.value.article.id)
      ligneCommande.article = tmpArticle[0];

      if (this.lignesCommande.includes(ligneCommande)){
        const index = this.lignesCommande.indexOf(ligneCommande);
        this.lignesCommande[index] = ligneCommande;
      }else{
        this.lignesCommande.push(ligneCommande);
      }

    }else{
      this.notifierService.notify(
        'Ligne de commande invalide. Veuiller verifier le formulaire',
        'Attention',
        NotificationType.WARNING
      );
    }
  }

  deleteLigneCommande(ligneCommande: any){
    const index = this.lignesCommande.indexOf(ligneCommande);
    if (index >= 0){
      this.lignesCommande.splice(index, 1);
    }
  }

  updateLigneCommande(ligneCommande: any){
    this.initLigneCmdForm(ligneCommande);
  }

  saveCommande(){
    if (this.commandForm.valid){
      if (!this.isEdition){
        const commande = this.prepareDataToSave(this.commandForm);
        this.commandeService.create(commande).subscribe(
          apiResponse => {
            this.processSuccess(apiResponse);
          },
          error => {
            this.processError(error);
          }
        );
      }else{
        this.currentCommande.ligneCommande = this.lignesCommande;
        this.currentCommande.prixTotal = this.computTotalPrice(this.lignesCommande);
        this.commandeService.updateCommande(this.currentCommande, this.currentCommandeId).subscribe(
          apiResponse => {
            this.processSuccess(apiResponse);
          },
          error => {
            this.processError(error);
          }
        );
      }
    }
  }

  private processSuccess(apiResponse: ApiResponseModel<any>) {
    if (apiResponse.code == 200) {
      this.notifierService.notify(
        'Commande enregistré avec succès',
        'Succès',
        NotificationType.SUCCESS
      );
    } else {
      this.notifierService.notify(
        apiResponse.message,
        'Erreur',
        NotificationType.ERROR
      );
    }
  }

  private processError(error: any) {
    this.notifierService.notify(
      'Erreur de communication avec le serveur',
      'Erreur',
      NotificationType.ERROR
    );
  }

  prepareDataToSave(formData: any){
    const commande = new CommandeModel();
    commande.ligneCommande = this.lignesCommande;
    commande.fournisseurParticulier = (formData.value.fournisseurParticulier.id) ? formData.value.fournisseurParticulier : null;
    commande.fournisseurEntreprise = (formData.value.fournisseurEntreprise.id) ? formData.value.fournisseurEntreprise : null;
    commande.prixTotal = this.totalPrice;
    commande.demandeur = formData.value.demandeur;
    commande.dateLivraison = formData.value.dateLivraison;
    return commande;
  }

  computTotalPrice(lignesCommande:Array<LigneCommandeModel>){
    lignesCommande.forEach(ligne => {
      this.totalPrice += ligne.qte * ligne.prixUnitaire;
    });
    return this.totalPrice;
  }

  private loadArticles() {
    this.articleService.findAllArticles().subscribe(
      apiResponse => {
        if (apiResponse.code == 200){
          this.articles = apiResponse.result;
        }else{
          this.notifierService.notify(
            'Erreur lors de la recupération de la liste des articles',
            'Erreur',
            NotificationType.ERROR
          );
        }
      },
      error => {
        this.notifierService.notify(
          'Erreur lors de la recupération de la liste des articles',
          'Erreur',
          NotificationType.ERROR
        );
      }
    );
  }

  private loadFournisseurs() {
    this.fournisseurService.findAllFournisseurParticulier().subscribe(
      apiResponse => {
        if (apiResponse.code == 200){
          this.fournisseursParticuliers = apiResponse.result;
        }else{
          this.notifierService.notify(
            'Erreur lors de la recupération de la liste des Fournisseurs',
            'Erreur',
            NotificationType.ERROR
          );
        }
      },
      error => {
        this.notifierService.notify(
          'Erreur lors de la recupération de la liste des fournisseurs',
          'Erreur',
          NotificationType.ERROR
        );
      }
    );

    this.fournisseurService.findAllFournisseurEntreprise().subscribe(
      apiResponse => {
        if (apiResponse.code == 200){
          this.fournisseursEntreprise = apiResponse.result;
        }else{
          this.notifierService.notify(
            'Erreur lors de la recupération de la liste des fournisseurs',
            'Erreur',
            NotificationType.ERROR
          );
        }
      },
      error1 => {
        this.notifierService.notify(
          'Erreur lors de la recupération de la liste des fournisseurs',
          'Erreur',
          NotificationType.ERROR
        );
      }
    );
  }
}

