import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BailModel} from "../../../../shared/models/entity/bail.model";
import {BailService} from "../../../../shared/services/services/bail.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {HttpStatusCode} from "@angular/common/http";
import {NotificationType} from "../../../../shared/components/notification/notification-type";

@Component({
  selector: 'app-cloturer-bail',
  templateUrl: './cloturer-bail.component.html',
  styleUrls: ['./cloturer-bail.component.scss']
})
export class CloturerBailComponent implements OnInit {
  loading: boolean = false;
  reservationForm: FormGroup = {} as FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CloturerBailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BailModel,
    private fb: FormBuilder,
    private bailService: BailService,
    private notificationService: NotifierService
  ) { }

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      indiceEntre: ['', Validators.required]
    })
  }

  process() {
    this.loading = true;
    if (this.reservationForm.valid){
      const occupationReq = Object.create(null);
      occupationReq.indiceEntrer = this.reservationForm.value.indiceEntre;
      occupationReq.bailId = this.data.id;
      this.bailService.cloturer(occupationReq).subscribe(
        responseApi => {
          if(responseApi.code == HttpStatusCode.Ok.valueOf()){
            this.loading = false;
            this.dialogRef.close(true);
          }else{
            this.loading = false;
            this.notificationService.notify(responseApi.message, 'Cloture du bail éffectuée avec succès', NotificationType.ERROR);
          }
        },
        error => {
          this.loading = false;
          this.notificationService.notify(
            'Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
            'Occupation du local',
            NotificationType.ERROR
          );
        }
      );
    }
  }
}
