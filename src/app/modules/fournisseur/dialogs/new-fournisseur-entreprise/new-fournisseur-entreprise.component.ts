import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FournisseurService} from "../../../../shared/services/services/fournisseur.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {AppStore} from "../../../../shared/utils/app-store";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {FournisseurEntrepriseModel} from "../../../../shared/models/entity/fournisseur-entreprise.model";

@Component({
  selector: 'app-new-fournisseur-entreprise',
  templateUrl: './new-fournisseur-entreprise.component.html',
  styleUrls: ['./new-fournisseur-entreprise.component.scss']
})
export class NewFournisseurEntrepriseComponent implements OnInit {

  fournisseurFormGroup: FormGroup = {} as FormGroup;
  isEdition: boolean;

  constructor(
    private dialogRef: MatDialogRef<NewFournisseurEntrepriseComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private fournisseurService: FournisseurService,
    private notifierService: NotifierService,
    private appStore: AppStore
  ) {
    this.isEdition = false;
  }

  ngOnInit(): void {
    this.isEdition = this.data.edition;
    if (this.data.edition){
      this.initForm(this.data.fournisseurEntreprise);
    }else{
      this.initForm();
    }
  }

  private initForm(fournisseur?: FournisseurEntrepriseModel) {
    if (fournisseur) {
      this.fournisseurFormGroup = this.fb.group({
        logo: [fournisseur.logo, Validators.required],
        raisonSociale: [fournisseur.raisonSociale, Validators.required],
        niu: [fournisseur.niu, Validators.required],
        rccm: [fournisseur.rccm, Validators.required],
        poste: [fournisseur.poste, Validators.required],
        telephone: [fournisseur.telephone, Validators.required],
        echeance: [fournisseur.echeance],
        mail1: [fournisseur.mail1],
        mail2: [fournisseur.mail2]
      });
    } else {
      this.fournisseurFormGroup = this.fb.group({
        logo: ['', Validators.required],
        raisonSociale: ['', Validators.required],
        niu: ['', Validators.required],
        rccm: ['', Validators.required],
        poste: ['', Validators.required],
        telephone: ['', Validators.required],
        echeance: [''],
        mail1: ['', Validators.email],
        mail2: ['', Validators.email]
      });
    }
  }

  saveFournisseur() {
    if (this.fournisseurFormGroup.valid) {
      if (!this.data.edition) {
        this.fournisseurService.createFournisseurEntrep(this.fournisseurFormGroup.value).subscribe(
          apiResponse => {
            this.processSuccess(apiResponse);
          },
          error => {
            this.processError(error);
          }
        );
      }else{
        this.fournisseurService.updateFournisseurEntrep(this.fournisseurFormGroup.value, this.data.fournisseurEntreprise.id).subscribe(
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
        'Fournisseur enregistré avec succès',
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
    console.dir(error);
    this.notifierService.notify(
      'Erreur de communication avec le serveur',
      'Erreur',
      NotificationType.ERROR
    );
    this.dialogRef.close(false);
  }


}
