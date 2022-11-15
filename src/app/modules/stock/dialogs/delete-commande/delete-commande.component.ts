import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FournisseurService} from "../../../../shared/services/services/fournisseur.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {CommandeService} from "../../../../shared/services/services/commandeService";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";
import {NotificationType} from "../../../../shared/components/notification/notification-type";

@Component({
  selector: 'app-delete-commande',
  templateUrl: './delete-commande.component.html',
  styleUrls: ['./delete-commande.component.scss']
})
export class DeleteCommandeComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteCommandeComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private commandeService: CommandeService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
  }

  performAction() {
    this.commandeService.deleteCommande(this.data.id).subscribe(
      apiResponse => {
        this.processSuccess(apiResponse);
      },
      error => {
        this.processError(error);
      }
    );
  }

  private processSuccess(apiResponse: ApiResponseModel<any>) {
    if (apiResponse.code == 200) {
      this.notifierService.notify(
        'Commande supprimée avec succès',
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
