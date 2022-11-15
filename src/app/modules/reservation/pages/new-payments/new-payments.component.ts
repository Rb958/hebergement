import { ReservationModel } from 'src/app/shared/models/entity/reservation.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'src/app/shared/components/notification/notifier.service';
import { ReservationService } from 'src/app/shared/services/services/reservation.service';
import { AppStore, LocalData } from 'src/app/shared/utils/app-store';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import * as moment from 'moment';
import { LocalModel } from 'src/app/shared/models/entity/local.model';
import { NotificationType } from 'src/app/shared/components/notification/notification-type';

@Component({
  selector: 'app-new-payments',
  templateUrl: './new-payments.component.html',
  styleUrls: ['./new-payments.component.scss']
})
export class NewPaymentsComponent implements OnInit {

  paymentForm: FormGroup = {} as FormGroup;

  currentLocal : LocalModel = {} as LocalModel;

  isLocataire: boolean = true;
  isParticulier: boolean = true;
  totalPrice : number = 0;
  discountAmount : number = 0;
  rest: number = 0;
  loading = false;

  localData: LocalData = {} as LocalData;

  constructor(
    private dialogRef: MatDialogRef<ReservationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public reservation: ReservationModel,
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private notifier: NotifierService,
    private appStore: AppStore
  ) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      amount: [this.reservation.restAmount, [Validators.pattern('^[0-9]+$'),Validators.required]],
      discount: [0],
      paymentMethod: ['', Validators.required]
    });
    this.localData = this.appStore.getData();
    this.totalPrice = this.reservation.restAmount;
    // this.totalPrice = this.computeTotalPrice(this.reservation.startDate, this.reservation.endDate);
  }

  computeRest(value: string) : number{
    return this.totalPrice - parseInt(value) - this.discountAmount;
  }

  computeTotalPrice(startDate: string, endDate: string) {
    const start = moment(startDate);
    const end = moment(endDate);
    const days = end.diff(start, 'days', true) + 1;
    this.totalPrice = this.currentLocal.prix * Math.abs(Math.ceil(days));
    return this.totalPrice;
  }

  computeDiscount(discount: string) {
    this.discountAmount = Math.ceil((this.totalPrice * parseInt(discount)) / 100);
    return this.discountAmount;
  }


  performAction(){

    if(this.paymentForm.valid){
      if(this.totalPrice < this.paymentForm.value.amount){
        this.loading = false;
        this.notifier.notify(
          'Le montant à payer doit etre inferieur au montant total',
          'Notification',
          NotificationType.WARNING
        );
        return;
      }
      this.reservationService.addPayment(this.localData.userDetails?.userId, this.paymentForm.value, this.reservation.id).subscribe(
        apiResponse => {
          if (apiResponse.code == 200){
            this.notifier.notify(
              'Local réservé avec succes',
              'Notification',
              NotificationType.SUCCESS
            );
            this.loading = false;
            this.dialogRef.close(apiResponse.result);
          }else{
            this.loading = false;
            this.notifier.notify(
              'Erreur lors de la creation de la reservation. Veuiller rééssayer',
              'Notification',
              NotificationType.ERROR
            );
          }
        },
        error => {
          this.loading = false;
          this.notifier.notify(
            'Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
            'Notification',
            NotificationType.ERROR
          );
        }
      );
    }else{
      this.loading = false;
      this.notifier.notify(
        'Veuiller renseigner tous les champs obligatoire',
        'Formulaire invalide',
        NotificationType.WARNING
      );
    }
  }

}
