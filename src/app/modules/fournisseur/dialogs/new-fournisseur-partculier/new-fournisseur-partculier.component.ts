import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppStore} from "../../../../shared/utils/app-store";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {FournisseurService} from "../../../../shared/services/services/fournisseur.service";
import {FournisseurParticulierModel} from "../../../../shared/models/entity/fournisseur-particulier.model";

@Component({
  selector: 'app-new-fournisseur-partculier',
  templateUrl: './new-fournisseur-partculier.component.html',
  styleUrls: ['./new-fournisseur-partculier.component.scss']
})
export class NewFournisseurPartculierComponent implements OnInit {

  fournisseurFormGroup: FormGroup = {} as FormGroup;
  isEdition: boolean;

  constructor(
    private dialogRef: MatDialogRef<NewFournisseurPartculierComponent>,
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
      this.initForm(this.data.fournisseurParticulier);
    }else{
      this.initForm();
    }
  }

  private initForm(fournisseur?: FournisseurParticulierModel) {
    if (fournisseur) {
      this.fournisseurFormGroup = this.fb.group({
        nom: [fournisseur.nom, Validators.required],
        prenom: [fournisseur.prenom, Validators.required],
        localisation: [fournisseur.localisation, Validators.required],
        telephone: [fournisseur.telephone, Validators.required],
        echeance: [fournisseur.echeance],
        mail1: [fournisseur.mail1],
        mail2: [fournisseur.mail2]
      });
    } else {
      this.fournisseurFormGroup = this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        localisation: ['', Validators.required],
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
        this.fournisseurService.createFournisseurPart(this.fournisseurFormGroup.value).subscribe(
          apiResponse => {
            this.processSuccess(apiResponse);
          },
          error => {
            this.processError(error);
          }
        );
      }else{
        this.fournisseurService.updateFournisseurPart(this.fournisseurFormGroup.value, this.data.fournisseurParticulier.id).subscribe(
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
