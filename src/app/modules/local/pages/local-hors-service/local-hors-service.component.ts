import {Component, Inject, OnInit} from '@angular/core';
import {HttpStatusCode} from "@angular/common/http";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LocalModel} from "../../../../shared/models/entity/local.model";
import {LocalService} from "../../../../shared/services/services/local.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";

@Component({
  selector: 'app-local-hors-service',
  templateUrl: './local-hors-service.component.html',
  styleUrls: ['./local-hors-service.component.scss']
})
export class LocalHorsServiceComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();
  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<LocalHorsServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LocalModel,
    private localService: LocalService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {}

  onProcess(){
    this.loading = true;
    if (this.startDate && this.endDate){
      const indisponibilite = Object.create(null);
      indisponibilite.startDate = this.startDate;
      indisponibilite.endDate = this .endDate;
      indisponibilite.local = this.data;
      this.localService.horsService(this.data.id, indisponibilite).subscribe(
        apiResponse => {
          if(apiResponse.code == HttpStatusCode.Ok.valueOf()){
            this.notifierService.notify(
              apiResponse.message,
              'Mise hors service',
              NotificationType.SUCCESS
            );
            this.loading = false;
            this.dialogRef.close(true);
          }else{
            this.loading = false;
            this.notifierService.notify(
              apiResponse.message,
              'Mise hors service',
              NotificationType.ERROR
            );
          }
        },
        error => {
          this.loading = false;
          this.notifierService.notify(
            'Erreur lors du traitement de la requete',
            'Mise hors service',
            NotificationType.ERROR
          );
        }
      );
    }
  }
}
