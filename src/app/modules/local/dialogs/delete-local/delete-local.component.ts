import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LocalModel} from "../../../../shared/models/entity/local.model";
import {LocalService} from "../../../../shared/services/services/local.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {NotificationType} from "../../../../shared/components/notification/notification-type";

@Component({
  selector: 'app-delete-local',
  templateUrl: './delete-local.component.html',
  styleUrls: ['./delete-local.component.scss']
})
export class DeleteLocalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteLocalComponent>,
    @Inject(MAT_DIALOG_DATA) private local: LocalModel,
    private localService: LocalService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
  }

  performAction() {
    this.localService.deleteLocal(this.local.id).subscribe(
      responseApi => {
        if (responseApi.code == 200){
          this.notifier.notify(
            'Local supprimé avec succes',
            'Notification',
            NotificationType.SUCCESS
          );
          this.dialogRef.close(true);
        }else{
          this.notifier.notify(
            'Erreur lors de la suppression du local. Veuiller réesayer',
            'Notification',
            NotificationType.ERROR
          );
        }
      },
      error => {
        this.notifier.notify(
          'Erreur de connection qu serveur',
          'Notification',
          NotificationType.ERROR
        );
      }
    );
  }
}
