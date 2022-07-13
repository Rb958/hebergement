import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LocalModel} from "../../../shared/models/entity/local.model";
import {LocalService} from "../../../shared/services/services/local.service";
import {NotifierService} from "../../../shared/components/notification/notifier.service";
import {NotificationType} from "../../../shared/components/notification/notification-type";

@Component({
  selector: 'app-enable-local',
  templateUrl: './enable-local.component.html',
  styleUrls: ['./enable-local.component.scss']
})
export class EnableLocalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EnableLocalComponent>,
    @Inject(MAT_DIALOG_DATA) private local: LocalModel,
    private localService: LocalService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
  }

  performAction() {
    this.localService.enableLocal(this.local.id, this.local).subscribe(
      responseApi => {
        if (responseApi.code == 200){
          this.notifier.notify(
            'Local activé avec succes',
            'Notification',
            NotificationType.SUCCESS
          );
          this.dialogRef.close(true);
        }else{
          this.notifier.notify(
            'Erreur lors de l\'activation du local. Veuiller réesayer',
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
