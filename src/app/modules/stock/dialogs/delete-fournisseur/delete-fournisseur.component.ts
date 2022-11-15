import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FournisseurService} from "../../../../shared/services/services/fournisseur.service";
import {FournisseurParticulierModel} from "../../../../shared/models/entity/fournisseur-particulier.model";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {FournisseurEntrepriseModel} from "../../../../shared/models/entity/fournisseur-entreprise.model";

@Component({
  selector: 'app-delete-fournisseur',
  templateUrl: './delete-fournisseur.component.html',
  styleUrls: ['./delete-fournisseur.component.scss']
})
export class DeleteFournisseurComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteFournisseurComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fournisseurService: FournisseurService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
  }

  performAction() {
    if (this.data instanceof FournisseurParticulierModel){
      this.fournisseurService.deleteFournisseurPart(this.data.id).subscribe(
        apiResponse => {
          this.processSuccess(apiResponse);
        },
        error => {
          this.processError(error);
        }
      );
    }
    if (this.data instanceof FournisseurEntrepriseModel){
      this.fournisseurService.deleteFournisseurEntrep(this.data.id).subscribe(
        apiResponse => {
          this.processSuccess(apiResponse);
        },
        error => {
          this.processError(error);
        }
      );
    }
  }

  private processSuccess(apiResponse: ApiResponseModel<any>) {
    if (apiResponse.code == 200) {
      this.notifierService.notify(
        'Article enregistré avec succès',
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
}
