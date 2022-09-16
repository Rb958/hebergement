import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {DepenseService} from "../../../../shared/services/services/depense.service";

@Component({
  selector: 'app-delete-depense',
  templateUrl: './delete-depense.component.html',
  styleUrls: ['./delete-depense.component.scss']
})
export class DeleteDepenseComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteDepenseComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private depenseService: DepenseService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
  }

  performAction() {
    this.depenseService.deleteEmployee(this.data).subscribe(
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
