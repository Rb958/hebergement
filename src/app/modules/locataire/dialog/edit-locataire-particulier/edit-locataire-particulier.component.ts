import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LocataireService } from "../../../../shared/services/services/locataire.service";
import { NotifierService } from "../../../../shared/components/notification/notifier.service";
import { NotificationType } from "../../../../shared/components/notification/notification-type";
import { FileUtil } from "../../../../shared/utils/file.util";
import { UploadService } from "../../../../shared/services/services/upload.service";
import { StorageInfoModel } from "../../../../shared/models/storage-info.model";
import { Subscription } from "rxjs";
import { HttpStatusCode } from "@angular/common/http";

@Component({
  selector: 'app-edit-locataire-particulier',
  templateUrl: './edit-locataire-particulier.component.html',
  styleUrls: ['./edit-locataire-particulier.component.scss']
})
export class EditLocataireParticulierComponent implements OnInit, OnDestroy {
  locatairePartForm: FormGroup = {} as FormGroup;
  isEdition: boolean = false;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;
  uploadedFileLink: string | undefined;

  uploadSubscription: Subscription | undefined;

  constructor(
    private dialogRef: MatDialogRef<EditLocataireParticulierComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: UntypedFormBuilder,
    private locataireService: LocataireService,
    private notifier: NotifierService,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.isEdition = this.data.edition;
    this.initForm();
  }

  sumbitForm() {
    if (this.locatairePartForm.valid) {
      if (this.data.edition) {
        this.locataireService.updateLocataireParticulier(this.data.locataire.id, this.locatairePartForm.value).subscribe(
          apiResponse => {
            if (apiResponse.code == 200) {
              this.notifier.notify(
                'Locataire enregistrer avec succes',
                'Notitification',
                NotificationType.SUCCESS
              );
              this.dialogRef.close(apiResponse.result);
            } else {
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
      } else {
        this.locatairePartForm.value.type = 'particulier'
        if (this.uploadedFileLink) {
          this.locatairePartForm.value.pjCni = this.uploadedFileLink
          this.locataireService.saveLocataireParticulier(this.locatairePartForm.value).subscribe(
            apiResponse => {
              if (apiResponse.code == 200) {
                this.notifier.notify(
                  'Locataire enregistrer avec succes',
                  'Notitification',
                  NotificationType.SUCCESS
                );
                this.dialogRef.close(apiResponse.result);
              } else {
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
        } else {
          this.notifier.notify(
            'Veuiller charger la preuve de votre CNI',
            'Formulaire invalide',
            NotificationType.WARNING
          );
        }
      }
    } else {
      this.notifier.notify(
        'Formulaire invalide veuiller verifier les champs du formulaire',
        'Notitification',
        NotificationType.WARNING
      );
    }
  }

  private initForm() {
    if (!this.data.edition) {
      this.locatairePartForm = this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        telephone: ['', Validators.required],
        lieuTravail: [''],
        cni: ['', Validators.required],
        pjCni: [''],
        stMaritale: [''],
        persContact: [''],
        persTelephone: [''],
        pjContrat: ['']
      });
    } else {
      this.locatairePartForm = this.fb.group({
        nom: [this.data.locataire.nom],
        prenom: [this.data.locataire.prenom],
        telephone: [this.data.locataire.telephone],
        lieuTravail: [this.data.locataire.lieuTravail],
        cni: [this.data.locataire.cni],
        pjCni: [this.data.locataire.pjCni],
        stMaritale: [this.data.locataire.stMaritale],
        persContact: [this.data.locataire.persContact],
        persTelephone: [this.data.locataire.persTelephone],
        pjContrat: [this.data.locataire.pjContrat]
      });
    }
  }

  processFinished(event: any) {
    this.uploadError = true;
    this.uploadedFileLink = event.ref;
  }

  handleError(event: any) {
    this.uploadError = true;
  }

  ngOnDestroy() {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
  }
}
