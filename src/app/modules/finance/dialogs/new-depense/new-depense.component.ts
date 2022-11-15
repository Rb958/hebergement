import { FournisseurParticulierModel } from './../../../../shared/models/entity/fournisseur-particulier.model';
import { FournisseurEntrepriseModel } from './../../../../shared/models/entity/fournisseur-entreprise.model';
import { LocalData, AppStore } from './../../../../shared/utils/app-store';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NotifierService } from "../../../../shared/components/notification/notifier.service";
import { ApiResponseModel } from "../../../../shared/models/api-response.model";
import { NotificationType } from "../../../../shared/components/notification/notification-type";
import { DepenseService } from "../../../../shared/services/services/depense.service";
import { DepenseModel } from "../../../../shared/models/entity/depense.model";
import { LocalModel } from "../../../../shared/models/entity/local.model";
import { LocalService } from "../../../../shared/services/services/local.service";
import { Subscription } from 'rxjs';
import { FournisseurService } from 'src/app/shared/services/services/fournisseur.service';

@Component({
  selector: 'app-new-depense',
  templateUrl: './new-depense.component.html',
  styleUrls: ['./new-depense.component.scss']
})
export class NewDepenseComponent implements OnInit {

  depenseForm: FormGroup = {} as FormGroup;
  isEdition: boolean;
  locals: Array<LocalModel> = [];

  localData: LocalData = {} as LocalData;

  uploadSuccess: boolean = false;
  uploadError: boolean = false;
  uploadedFileLink: string | undefined;

  loading = false;

  isEnterprise = false;

  uploadSubscription: Subscription | undefined;

  fournisseursParticuliers: Array<FournisseurParticulierModel> = [];
  fournisseursEntreprise: Array<FournisseurEntrepriseModel> = [];

  constructor(
    private dialogRef: MatDialogRef<NewDepenseComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private depenseService: DepenseService,
    private notifierService: NotifierService,
    private localService: LocalService,
    private fournisseurService: FournisseurService,
    private appStore: AppStore
  ) {
    this.isEdition = false;
    this.localData = this.appStore.getData();
  }

  ngOnInit(): void {
    this.isEdition = this.data.edition;
    this.loadLocals();
    this.loadFournisseurs();
    if (this.data.edition){
      this.initForm(this.data.depense);
    }else{
      this.initForm();
    }
  }

  private initForm(depense?: DepenseModel) {
    if (depense) {
      this.depenseForm = this.fb.group({
        demandeur: [depense?.demandeur, Validators.required],
        type: [depense?.type, Validators.required],
        local: this.fb.group({
          id: [depense?.local?.id]
        }),
        fournisseurEntreprise: this.fb.group({
          id: [depense?.fournisseurEntreprise?.id]
        }),
        fournisseurParticulier: this.fb.group({
          id: [depense?.fournisseurParticulier?.id]
        }),
        categorie: [depense?.categorie, Validators.required],
        montant: [depense?.montant, Validators.required],
        commentaire: [depense?.commentaire],
        // pieceJointe: [depense?.pieceJointe, Validators.required]
      });
    } else {
      this.depenseForm = this.fb.group({
        demandeur: [this.localData.userDetails?.firstname + ' ' + this.localData.userDetails?.lastname, Validators.required],
        type: ['', Validators.required],
        local: this.fb.group({
          id: ['']
        }),
        fournisseurEntreprise: this.fb.group({
          id: ['']
        }),
        fournisseurParticulier: this.fb.group({
          id: ['']
        }),
        categorie: ['', Validators.required],
        montant: ['', Validators.required],
        commentaire: [''],
        // pieceJointe: ['', Validators.required]
      });
    }
  }

  saveDepense() {
    this.loading = true;
    this.depenseForm.value.pieceJointe = this.uploadedFileLink;
    this.depenseForm.value.fournisseurEntreprise = (this.depenseForm.value.fournisseurEntreprise?.id) ? this.depenseForm.value.fournisseurEntreprise : null;
    this.depenseForm.value.fournisseurParticulier = (this.depenseForm.value.fournisseurParticulier?.id) ? this.depenseForm.value.fournisseurParticulier : null;
    this.depenseForm.value.local = this.depenseForm.value.local.id == '' ? null : {id : this.depenseForm.value.local.id}
    if (this.depenseForm.valid && this.uploadSuccess) {
      if (!this.data.edition ) {
        // this.depenseForm.value.pieceJointe = this.uploadedFileLink;
        this.depenseService.create(this.depenseForm.value).subscribe(
          apiResponse => {
            this.loading = false;
            this.processSuccess(apiResponse);
          },
          error => {
            this.loading = false;
            this.processError(error);
          }
        );
      }else{
        // this.employeeForm.value.id = this.data.employee.id;
        this.depenseService.updateDepense(this.depenseForm.value, this.data.employee.id).subscribe(
          apiResponse => {
            this.loading = false;
            this.processSuccess(apiResponse);
          },
          error => {
            this.loading = false;
            this.processError(error);
          }
        );
      }
    }else{
      this.loading = false;
      this.notifierService.notify(
        'Verifier les champs obliatoirs',
        'Formulaire invalide',
        NotificationType.ERROR
      );
    }
  }

  processFinished(event: any) {
    this.uploadSuccess = true;
    this.uploadedFileLink = event.ref;
  }

  handleError(event: any) {
    this.uploadError = true;
  }

  private processSuccess(apiResponse: ApiResponseModel<any>) {
    if (apiResponse.code == 200) {
      this.notifierService.notify(
        'Dépense enregistré avec succès',
        'Succès',
        NotificationType.SUCCESS
      );
      this.dialogRef.close(apiResponse.result);
    } else {
      this.notifierService.notify(
        apiResponse.message,
        'Erreur',
        NotificationType.ERROR
      );
      this.dialogRef.close(false);
    }
  }

  private processError(error: any) {
    this.notifierService.notify(
      'Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
      'Erreur',
      NotificationType.ERROR
    );
    this.dialogRef.close(false);
  }

  private loadLocals() {
    this.localService.findAllLocals().subscribe(
      apiResponse => {
        if (apiResponse.code == 200){
          this.locals = apiResponse.result;
        }
      },
      error => {
        this.notifierService.notify(
          "Impossible de charger tous les locaux",
          'Erreur',
          NotificationType.ERROR
        );
        this.dialogRef.close(false);
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
