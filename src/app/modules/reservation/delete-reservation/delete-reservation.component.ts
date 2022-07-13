import {Component, Inject, OnInit} from '@angular/core';
import {ReservationService} from "../../../shared/services/services/reservation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationType} from "../../../shared/components/notification/notification-type";
import {NotifierService} from "../../../shared/components/notification/notifier.service";

@Component({
  selector: 'app-delete-reservation',
  templateUrl: './delete-reservation.component.html',
  styleUrls: ['./delete-reservation.component.scss']
})
export class DeleteReservationComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteReservationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private reservationService: ReservationService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
  }

  performAction() {
    this.reservationService.cancelBooking(this.data.booking.id).subscribe(
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
            'Erreur lors de l\'annuation de la reservation',
            'Notification',
            NotificationType.ERROR
          );
          this.dialogRef.close(false);
        }
      },
      error => {
        this.notifierService.notify(
          'Erreur lors de l\'annuation de la reservation',
          'Notification',
          NotificationType.ERROR
        );
        this.dialogRef.close(false);
      }
    );
  }
}
