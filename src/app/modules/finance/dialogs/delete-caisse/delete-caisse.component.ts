import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {CaisseService} from "../../../../shared/services/services/caisse.service";

@Component({
  selector: 'app-delete-caisse',
  templateUrl: './delete-caisse.component.html',
  styleUrls: ['./delete-caisse.component.scss']
})
export class DeleteCaisseComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteCaisseComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private caisseService: CaisseService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
  }

  performAction() {
    this.caisseService.deleteCaisse(this.data).subscribe(
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
