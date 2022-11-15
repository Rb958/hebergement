import { DepenseService } from './../../../../shared/services/services/depense.service';
import { DepenseModel } from 'src/app/shared/models/entity/depense.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ReservationFormComponent } from 'src/app/modules/reservation/pages/reservation-form/reservation-form.component';
import { NotificationType } from 'src/app/shared/components/notification/notification-type';
import { NotifierService } from 'src/app/shared/components/notification/notifier.service';
import { BailModel } from 'src/app/shared/models/entity/bail.model';
import { LocalModel } from 'src/app/shared/models/entity/local.model';
import { BailService } from 'src/app/shared/services/services/bail.service';
import { LocalData, AppStore } from 'src/app/shared/utils/app-store';

@Component({
  selector: 'app-depense-payment',
  templateUrl: './depense-payment.component.html',
  styleUrls: ['./depense-payment.component.scss']
})
export class DepensePaymentComponent implements OnInit {

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
    @Inject(MAT_DIALOG_DATA) public depense: DepenseModel,
    private depenseService: DepenseService,
    private fb: FormBuilder,
    private notifier: NotifierService,
    private appStore: AppStore
  ) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      amount: [this.depense.restAmount, [Validators.pattern('^[0-9]+$'),Validators.required]],
      paymentMethod: ['', Validators.required]
    });
    this.localData = this.appStore.getData();
    this.totalPrice = this.depense.restAmount == 0 || this.depense.restAmount == null ? this.depense.montant : this.depense.restAmount;
    // this.totalPrice = this.computeTotalPrice(this.bail.startDate, this.bail.endDate);
  }

  computeRest(value: string) : number{
    return this.totalPrice - parseInt(value) - this.discountAmount;
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
      this.paymentForm.value.rest = this.depense.montant - this.depense.paidAmount;
      this.depenseService.addPayment(this.paymentForm.value, this.localData.userDetails?.userId, this.depense.id).subscribe(
        apiResponse => {
          if (apiResponse.code == 200){
            this.notifier.notify(
              'Paiement enregistré avec succes',
              'Notification',
              NotificationType.SUCCESS
            );
            this.loading = false;
            this.dialogRef.close(apiResponse.result);
          }else{
            this.loading = false;
            this.notifier.notify(
              'Erreur lors de l\'enregistrement du paiement. Veuiller rééssayer',
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
