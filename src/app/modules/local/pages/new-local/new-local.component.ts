import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {LocalService} from "../../../../shared/services/services/local.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-local',
  templateUrl: './new-local.component.html',
  styleUrls: ['./new-local.component.scss']
})
export class NewLocalComponent implements OnInit {
  onglet1Form: FormGroup = {} as FormGroup;
  onglet2Form: FormGroup = {} as FormGroup;
  onglet3Form: FormGroup = {} as FormGroup;
  formLoading = false;
  immoFrom: FormGroup = {} as FormGroup;

  immbilisations: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private notifier: NotifierService,
    private localService: LocalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForms();
    this.initImmoForm();
  }

  private initForms() {
    this.onglet1Form = this.fb.group({
      ville: ['', Validators.required],
      pays: ['', Validators.required],
      quartier: ['', Validators.required],
      immeuble: ['', Validators.required],
      typeLocal: ['', Validators.required],
      nomLocal: ['', Validators.required],
      numeroLocal: ['', Validators.required],
      etage: ['', Validators.required],
      localisation: ['', Validators.required],
      categorie: ['', Validators.required]
    });
    this.onglet2Form = this.fb.group({
      fumeur: [''],
      clim: [''],
      piscine: [''],
      wifi: [''],
      animaux: [''],
      chauffage: [''],
      parkingIn: [''],
      gadienJour: [''],
      gardientNuit: [''],
      groupeElect: ['']
    });
    this.onglet3Form = this.fb.group({
      nbrChambre: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      nbrDouche: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      prix: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      numCptEneo: [0, Validators.required]
      // typePrix: ['', Validators.required],
      // charges: [''],
      // contrat: ['']
    });
  }

  submit() {
    this.formLoading = true;
    if (this.onglet1Form.valid && this.onglet2Form.valid && this.onglet3Form.valid) {
      const data = {
        ...this.onglet1Form.value,
        ...this.onglet2Form.value,
        ...this.onglet3Form.value
      };
      data.immobilisations = this.immbilisations;
      this.localService.save(data).subscribe(
        responseApi => {
          if (responseApi.code == 200){
            this.notifier.notify(
              'Local enregistré avec succes',
              'Nouveau local',
              NotificationType.SUCCESS
            );
            this.formLoading = false;
            this.router.navigate(['../list-all'], {relativeTo: this.route});
          }else{
            this.formLoading = false;
            this.notifier.notify(
              responseApi.message,
              'Nouveau local',
              NotificationType.WARNING
            );
          }
        },
        error => {
          this.formLoading = false;
          this.notifier.notify(
            'Erreur du serveur',
            'Nouveau local',
            NotificationType.ERROR
          );
        }
      );
    }else{
      this.formLoading = false;
      this.notifier.notify(
        'Formulaire invalide',
        'Nouveau local',
        NotificationType.WARNING
      );
    }
  }

  private initImmoForm() {
    this.immoFrom = this.fb.group({
      designation: ['', Validators.required],
      prix: [1, Validators.required],
      qte: [0, Validators.required],
      description: [''],
    });
  }

  addImmo() {
    if (this.immoFrom.valid){
      this.immbilisations.push(this.immoFrom.value);
      this.initImmoForm();
    }else{
      this.notifier.notify(
        'Veuiller remplir tous les champs obligatoire du formulaire des immobilisations',
        'Nouveau local',
        NotificationType.WARNING
      );
    }
  }
}
