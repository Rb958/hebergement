import { BailModel } from 'src/app/shared/models/entity/bail.model';
import { BailService } from 'src/app/shared/services/services/bail.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationType } from 'src/app/shared/components/notification/notification-type';
import { NotifierService } from 'src/app/shared/components/notification/notifier.service';

@Component({
  selector: 'app-cancel-bail',
  templateUrl: './cancel-bail.component.html',
  styleUrls: ['./cancel-bail.component.scss']
})
export class CancelBailComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CancelBailComponent>,
    @Inject(MAT_DIALOG_DATA) private bail: BailModel,
    private bailService: BailService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
  }

  performAction() {
    this.bailService.cancelBail(this.bail.id).subscribe(
      responseApi => {
        if (responseApi.code == 200){
          this.notifierService.notify(
            'Reservation annulé avec success',
            'Notification',
            NotificationType.SUCCESS
          );
          this.dialogRef.close(responseApi.result);
        }else{
          this.notifierService.notify(
            'Erreur lors de l\'annuation du contrat de bail',
            'Notification',
            NotificationType.ERROR
          );
          this.dialogRef.close(false);
        }
      },
      error => {
        this.notifierService.notify(
          'Erreur lors de l\'annuation du contrat de bail',
          'Notification',
          NotificationType.ERROR
        );
        this.dialogRef.close(false);
      }
    );
  }
}
