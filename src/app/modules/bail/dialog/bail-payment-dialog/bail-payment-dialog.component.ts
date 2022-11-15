import { BailService } from 'src/app/shared/services/services/bail.service';
import { BailModel } from 'src/app/shared/models/entity/bail.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ReservationFormComponent } from 'src/app/modules/reservation/pages/reservation-form/reservation-form.component';
import { NotificationType } from 'src/app/shared/components/notification/notification-type';
import { NotifierService } from 'src/app/shared/components/notification/notifier.service';
import { LocalModel } from 'src/app/shared/models/entity/local.model';
import { LocalData, AppStore } from 'src/app/shared/utils/app-store';

@Component({
  selector: 'app-bail-payment-dialog',
  templateUrl: './bail-payment-dialog.component.html',
  styleUrls: ['./bail-payment-dialog.component.scss']
})
export class BailPaymentDialogComponent implements OnInit {

  paymentForm: FormGroup = {} as FormGroup;

  currentLocal : LocalModel = {} as LocalModel;

  isLocataire: boolean = true;
  isParticulier: boolean = true;
  totalPrice : number = 0;
  amountToPay = 0;
  discountAmount : number = 0;
  rest: number = 0;
  loading = false;

  localData: LocalData = {} as LocalData;

  constructor(
    private dialogRef: MatDialogRef<ReservationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public bail: BailModel,
    private bailService: BailService,
    private fb: FormBuilder,
    private notifier: NotifierService,
    private appStore: AppStore
  ) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      amount: [this.bail.restAmount, [Validators.pattern('^[0-9]+$'),Validators.required]],
      discount: [0],
      paymentMethod: ['', Validators.required]
    });
    this.localData = this.appStore.getData();
    this.totalPrice = this.bail.restAmount;
    // this.totalPrice = this.computeTotalPrice(this.bail.startDate, this.bail.endDate);
  }

  computeRest(value: string) : number{
    return this.totalPrice - parseInt(value) - this.discountAmount;
  }

  computeDiscount(discount: string) {
    this.discountAmount = Math.ceil((this.totalPrice * parseInt(discount)) / 100);
    this.amountToPay = this.totalPrice - this.discountAmount;
    return this.discountAmount;
  }


  performAction(){
    if(this.totalPrice < this.paymentForm.value.amount){
      this.loading = false;
      this.notifier.notify(
        'Le montant à payer doit etre inferieur au montant total',
        'Notification',
        NotificationType.WARNING
      );
      return;
    }
    if(this.paymentForm.valid){
      this.bailService.addPayment(this.localData.userDetails?.userId, this.paymentForm.value, this.bail.id).subscribe(
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
              'Erreur lors de la creation de la bail. Veuiller rééssayer',
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
