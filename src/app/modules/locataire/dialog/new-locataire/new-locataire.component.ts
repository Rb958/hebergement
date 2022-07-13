import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LocataireService} from "../../../../shared/services/services/locataire.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {NotificationType} from "../../../../shared/components/notification/notification-type";

@Component({
  selector: 'app-new-locataire',
  templateUrl: './new-locataire.component.html',
  styleUrls: ['./new-locataire.component.scss']
})
export class NewLocataireComponent implements OnInit {
  locataireSocForm: UntypedFormGroup = {} as UntypedFormGroup;
  isEdition: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<NewLocataireComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: UntypedFormBuilder,
    private locataireService: LocataireService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.isEdition = this.data.edition;
    this.initForm();
  }

  sumbitForm() {
    if (this.locataireSocForm.valid){
      if (this.data.edition){
        this.locataireService.updateLocataireSociete(this.data.locataire.id, this.locataireSocForm.value).subscribe(
          apiResponse => {
            if (apiResponse.code == 200){
              this.notifier.notify(
                'Locataire enregistrer avec succes',
                'Notitification',
                NotificationType.SUCCESS
              );
              this.dialogRef.close(apiResponse.result);
            }else{
              this.notifier.notify(
                'Erreur lors de l\'enregistrement du locataire',
                'Notitification',
                NotificationType.ERROR
              );
            }
          },
          error => {
            this.notifier.notify(
              'Erreur serveur',
              'Notitification',
              NotificationType.ERROR
            );
          }
        );
      }else{
        this.locataireSocForm.value.type = 'societe'
        this.locataireService.saveLocataireSociete(this.locataireSocForm.value).subscribe(
          apiResponse => {
            if (apiResponse.code == 200){
              this.notifier.notify(
                'Locataire enregistrer avec succes',
                'Notitification',
                NotificationType.SUCCESS
              );
              this.dialogRef.close(apiResponse.result);
            }else{
              this.notifier.notify(
                'Erreur lors de l\'enregistrement du locataire',
                'Notitification',
                NotificationType.ERROR
              );
            }
          },
          error => {
            this.notifier.notify(
              'Erreur serveur',
              'Notitification',
              NotificationType.ERROR
            );
          }
        );
      }
    }else{
      this.notifier.notify(
        'Formulaire invalide veuiller verifier les champs du formulaire',
        'Notitification',
        NotificationType.WARNING
      );
    }
  }

  private initForm() {
    if (!this.data.edition) {
      this.locataireSocForm = this.fb.group({
        raisonSociale: [''],
        niu: [''],
        nomGerant: [''],
        profession: [''],
        persContact1: [''],
        persTelephone1: [''],
        persEmail1: [''],
        persContacter2: [''],
        persTelephone2: [''],
        persEmail2: ['']
      });
    } else {
      this.locataireSocForm = this.fb.group({
        raisonSociale: [this.data.locataire.raisonSociale],
        niu: [this.data.locataire.niu],
        nomGerant: [this.data.locataire.nomGerant],
        profession: [this.data.locataire.profession],
        persContact1: [this.data.locataire.persContact1],
        persTelephone1: [this.data.locataire.persTelephone1],
        persEmail1: [this.data.locataire.persEmail1],
        persContacter2: [this.data.locataire.persContacter2],
        persTelephone2: [this.data.locataire.persTelephone2],
        persEmail2: [this.data.locataire.persEmail2]
      });
    }
  }
}
