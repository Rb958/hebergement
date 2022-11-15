import { ReservationModel } from 'src/app/shared/models/entity/reservation.model';
import { ReservationService } from 'src/app/shared/services/services/reservation.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStore, LocalData } from 'src/app/shared/utils/app-store';
import { HttpStatusCode } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationType } from 'src/app/shared/components/notification/notification-type';
import { NotifierService } from 'src/app/shared/components/notification/notifier.service';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import * as moment from 'moment';

@Component({
  selector: 'app-rembourse-reservation',
  templateUrl: './rembourse-reservation.component.html',
  styleUrls: ['./rembourse-reservation.component.scss']
})
export class RembourseReservationComponent implements OnInit {

  amountToPay = 0;
  totalLocal = 0;
  loading = false;
  cautionError: boolean | undefined;

  localData: LocalData = {} as LocalData;
  subscription: Subscription | undefined;

  constructor(
    private dialogRef: MatDialogRef<ReservationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public reservation: ReservationModel,
    private reservationService: ReservationService,
    private notifier: NotifierService,
    private appStore: AppStore
  ) { }

  ngOnInit(): void {
    this.localData = this.appStore.getData();
    this.totalAPayer();
  }

  getEcheanceInMonths(){
    return Math.abs(moment(new Date()).diff(moment(this.reservation.validite), 'days'));
    // let daysPattern = /([0-9]+)\WJour\(s\)/gmi.exec(this.reservation.);
    // let monthPattern = /([0-9]+)\WMois/gmi.exec(this.reservation.echeance);
    // let yearPattern = /([0-9]+)\WAn\(s\)/gmi.exec(this.reservation.echeance);
    // if(monthPattern && monthPattern[1]){
    //   months += parseInt(monthPattern[1]);
    // }
    // if(daysPattern && daysPattern[1]){
    //   months += (parseInt(daysPattern[1]) < 15) ? 1 : 0;
    // }
    // if(yearPattern && yearPattern[1]){
    //   months += parseInt(yearPattern[1]) * 12;
    // }

    // return months;
  }

  // computTotalCaution(){
  //   return (this.reservation.caution && this.reservation.cautionPeriod) ? this.reservation.caution * this.reservation.cautionPeriod : 0;
  // }

  totalAPayer(loyerInput?: HTMLInputElement){
      if(loyerInput && loyerInput.value.trim() != '')
        this.amountToPay = parseInt(loyerInput?.value);
      else
      this.amountToPay = this.reservation.local?.prix * this.getEcheanceInMonths();

      console.log("Loyé Remboursable : " + this.amountToPay);
  }

  performAction(){
    this.loading = true;
    const data = Object.create(null);
    data.amountToPay = this.amountToPay;
    data.restPeriod = this.getEcheanceInMonths();
    this.reservationService.cancelv2(this.reservation.id, data, this.localData.userDetails?.userId).subscribe(
      apiResponse => {
        if(apiResponse.code == HttpStatusCode.Ok.valueOf()){
          this.notifier.notify(
            'Annuler avec succes',
            'Annulation d\'un reservation',
            NotificationType.SUCCESS
          );
          this.dialogRef.close(true);
        }else{
          this.loading = false;
          this.notifier.notify(
            apiResponse.message,
            'Annulation d\'un reservation',
            NotificationType.ERROR
          );
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.notifier.notify(
          'Erreur lors de l\'annulation du reservation',
          'Annulation d\'un reservation',
          NotificationType.SUCCESS
        );
      }
    );
  }

}
