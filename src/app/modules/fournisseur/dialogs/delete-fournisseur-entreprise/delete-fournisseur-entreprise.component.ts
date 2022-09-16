import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CaisseService} from "../../../../shared/services/services/caisse.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {FournisseurService} from "../../../../shared/services/services/fournisseur.service";

@Component({
  selector: 'app-delete-fournisseur-entreprise',
  templateUrl: './delete-fournisseur-entreprise.component.html',
  styleUrls: ['./delete-fournisseur-entreprise.component.scss']
})
export class DeleteFournisseurEntrepriseComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteFournisseurEntrepriseComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fournisseurService: FournisseurService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
  }

  performAction() {
    this.fournisseurService.deleteFournisseurEntrep(this.data.id).subscribe(
      apiResponse => {
        if (apiResponse.code == 200){
          this.notifierService.notify(
            apiResponse.message,
            'Succès',
            NotificationType.SUCCESS
          );
          this.dialogRef.close(true);
        }else{
          this.notifierService.notify(
            apiResponse.message,
            'Erreur',
            NotificationType.ERROR
          );
          this.dialogRef.close(false);
        }
      },
      error => {
        this.notifierService.notify(
          "Erreur de comminucation avec le serveur",
          'Erreur',
          NotificationType.ERROR
        );
        this.dialogRef.close(false);
      }
    );
  }
}
