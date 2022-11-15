import { HttpStatusCode } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ReservationFormComponent } from 'src/app/modules/reservation/pages/reservation-form/reservation-form.component';
import { NotificationType } from 'src/app/shared/components/notification/notification-type';
import { NotifierService } from 'src/app/shared/components/notification/notifier.service';
import { BailModel } from 'src/app/shared/models/entity/bail.model';
import { BailService } from 'src/app/shared/services/services/bail.service';
import { LocalData, AppStore } from 'src/app/shared/utils/app-store';

@Component({
  selector: 'app-rembourse-bail',
  templateUrl: './rembourse-bail.component.html',
  styleUrls: ['./rembourse-bail.component.scss']
})
export class RembourseBailComponent implements OnInit {

  amountToPay = 0;
  totalLocal = 0;
  loading = false;
  cautionError: boolean | undefined;

  localData: LocalData = {} as LocalData;
  subscription: Subscription | undefined;

  constructor(
    private dialogRef: MatDialogRef<ReservationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public bail: BailModel,
    private bailService: BailService,
    private notifier: NotifierService,
    private appStore: AppStore
  ) { }

  ngOnInit(): void {
    this.localData = this.appStore.getData();
    this.totalLocal = this.bail.local.prix * this.getEcheanceInMonths();
    this.totalAPayer();
  }

  getEcheanceInMonths(){
    let months = 0;
    let daysPattern = /([0-9]+)\WJour\(s\)/gmi.exec(this.bail.echeance);
    let monthPattern = /([0-9]+)\WMois/gmi.exec(this.bail.echeance);
    let yearPattern = /([0-9]+)\WAn\(s\)/gmi.exec(this.bail.echeance);
    if(monthPattern && monthPattern[1]){
      months += parseInt(monthPattern[1]);
    }
    // if(daysPattern && daysPattern[1]){
    //   months += (parseInt(daysPattern[1]) < 15) ? 1 : 0;
    // }
    if(yearPattern && yearPattern[1]){
      months += parseInt(yearPattern[1]) * 12;
    }
    return months;
  }

  computTotalCaution(){
    return (this.bail.caution && this.bail.cautionPeriod) ? this.bail.caution * this.bail.cautionPeriod : 0;
  }

  totalAPayer(cautionPeriod?: HTMLInputElement){
    if (this.bail.caution && this.bail.cautionPeriod) {
      let cautionR = 0;
      let loyerR = 0;
      this.cautionError = cautionPeriod && parseInt(cautionPeriod.value) > this.bail.cautionPeriod;
      const caution = (cautionPeriod && cautionPeriod.value.trim() != '') ? parseInt(cautionPeriod.value) : this.bail.cautionPeriod;
      cautionR = caution * this.bail.caution;
      loyerR = this.bail.local.prix * this.getEcheanceInMonths();
      // console.log("Caution Remboursable : " + cautionR);
      // console.log("Loyé Remboursable : " + loyerR);

      const discount = ((this.bail.local.prix * this.bail.sejour) + this.bail.caution * this.bail.cautionPeriod) - this.bail.totalAmount;
      // console.log("Discount : " + discount );

      // if (this.bail.restAmount > 0) {
      //   this.amountToPay = cautionR + loyerR - this.bail.restAmount;
      // }else{
        if(this.bail.restAmount > 0){
          this.amountToPay = cautionR + loyerR - discount;
        }else{
          this.amountToPay = cautionR + loyerR;
        }
      // }
    }else{
      this.amountToPay = 0;
    }
  }

  performAction(){
    this.loading = true;
    const data = Object.create(null);
    data.amountToPay = this.amountToPay;
    data.restPeriod = this.getEcheanceInMonths();
    this.bailService.cancelv2(this.bail.id, data, this.localData.userDetails?.userId).subscribe(
      apiResponse => {
        if(apiResponse.code == HttpStatusCode.Ok.valueOf()){
          this.notifier.notify(
            'Annuler avec succes',
            'Annulation d\'un bail',
            NotificationType.SUCCESS
          );
          this.dialogRef.close(true);
        }else{
          this.loading = false;
          this.notifier.notify(
            apiResponse.message,
            'Annulation d\'un bail',
            NotificationType.ERROR
          );
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.notifier.notify(
          'Erreur lors de l\'annulation du bail',
          'Annulation d\'un bail',
          NotificationType.SUCCESS
        );
      }
    );
  }
}
