import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {LocalService} from "../../../../shared/services/services/local.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LocalModel} from "../../../../shared/models/entity/local.model";

@Component({
  selector: 'app-edit-local',
  templateUrl: './edit-local.component.html',
  styleUrls: ['./edit-local.component.scss']
})
export class EditLocalComponent implements OnInit {

  onglet1Form: FormGroup = {} as FormGroup;
  onglet2Form: FormGroup = {} as FormGroup;
  onglet3Form: FormGroup = {} as FormGroup;
  formLoading = false;
  immoFrom: FormGroup = {} as FormGroup;

  immbilisations: Array<any> = [];

  constructor(
    private dialogRef: MatDialogRef<EditLocalComponent>,
    private fb: FormBuilder,
    private notifier: NotifierService,
    private localService: LocalService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: LocalModel
  ) { }

  ngOnInit(): void {
    this.initForms(this.data);
    this.initImmoForm();
  }

  private initForms(local: LocalModel) {
    this.onglet1Form = this.fb.group({
      ville: [local.ville, Validators.required],
      pays: [local.pays, Validators.required],
      quartier: [local.quartier, Validators.required],
      immeuble: [local.immeuble, Validators.required],
      typeLocal: [local.typeLocal, Validators.required],
      nomLocal: [local.nomLocal, Validators.required],
      numeroLocal: [local.numeroLocal, Validators.required],
      etage: [local.etage, Validators.required],
      localisation: [local.localisation, Validators.required],
      categorie: [local.categorie, Validators.required]
    });
    this.onglet2Form = this.fb.group({
      fumeur: [local.fumeur],
      clim: [local.clim],
      piscine: [local.piscine],
      wifi: [local.wifi],
      animaux: [local.animaux],
      chauffage: [local.chauffage],
      parkingIn: [local.parkingIn],
      gadienJour: [local.gadienJour],
      gardientNuit: [local.gardientNuit],
      groupeElect: [local.groupeElect]
    });
    this.onglet3Form = this.fb.group({
      nbrChambre: [local.nbrChambre, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      nbrDouche: [local.nbrDouche, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      prix: [local.prix, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      numCptEneo: [local.numCptEneo, Validators.required]
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
      this.localService.update(data, this.data.id).subscribe(
        responseApi => {
          if (responseApi.code == 200){
            this.notifier.notify(
              'Local mise à juor avec succes',
              'Nouveau local',
              NotificationType.SUCCESS
            );
            this.formLoading = false;
            // this.router.navigate(['../list-all'], {relativeTo: this.route});
            this.dialogRef.close(true);
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
