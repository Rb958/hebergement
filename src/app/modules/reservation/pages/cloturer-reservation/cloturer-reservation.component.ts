import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BailModel} from "../../../../shared/models/entity/bail.model";
import {BailService} from "../../../../shared/services/services/bail.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {HttpStatusCode} from "@angular/common/http";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {ReservationModel} from "../../../../shared/models/entity/reservation.model";
import {ReservationService} from "../../../../shared/services/services/reservation.service";

@Component({
  selector: 'app-cloturer-reservation',
  templateUrl: './cloturer-reservation.component.html',
  styleUrls: ['./cloturer-reservation.component.scss']
})
export class CloturerReservationComponent implements OnInit {

  loading: boolean = false;
  reservationForm: FormGroup = {} as FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CloturerReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReservationModel,
    private fb: FormBuilder,
    private bailService: ReservationService,
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
      occupationReq.indiceSortie = this.reservationForm.value.indiceEntre;
      occupationReq.bookingId = this.data.id;
      this.bailService.cloturer(occupationReq).subscribe(
        responseApi => {
          if(responseApi.code == HttpStatusCode.Ok.valueOf()){
            this.loading = false;
            this.dialogRef.close(true);
          }else{
            this.loading = false;
            this.notificationService.notify(responseApi.message, 'Cloture de la reservation éffectuée avec succès', NotificationType.ERROR);
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
