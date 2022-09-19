import { LocalData, AppStore } from 'src/app/shared/utils/app-store';
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LocalModel} from "../../../../shared/models/entity/local.model";
import {ReservationService} from "../../../../shared/services/services/reservation.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocataieSociete, LocataireParticulierModel} from "../../../../shared/models/entity/locataire.model";
import {LocataireService} from "../../../../shared/services/services/locataire.service";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {PayementsModel} from "../../../../shared/models/entity/payements.model";
import {ReservationModel} from "../../../../shared/models/entity/reservation.model";
import * as moment from "moment";

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = {} as FormGroup;
  paymentForm: FormGroup = {} as FormGroup;
  locatairesSociete: Array<LocataieSociete> = [];
  locataireParticulier: Array<LocataireParticulierModel> = [];
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
    @Inject(MAT_DIALOG_DATA) private local: any,
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private notifier: NotifierService,
    private appStore: AppStore
  ) { }

  ngOnInit(): void {
    this.localData = this.appStore.getData();
    this.currentLocal = this.local.local;
    this.totalPrice = this.computeTotalPrice(this.local.startDate, this.local.endDate);
    this.initForm();
  }

  private initForm() {
    this.reservationForm = this.fb.group({
      dateReservation: [this.local.startDate],
      initiateur: [],
      nom: ['', Validators.required],
      prenom: [''],
      telephone: ['', Validators.required],
      validite: [this.local.endDate, Validators.required],
      preriodUnit: [this.currentLocal.typePrix, Validators.required],
    });

    this.paymentForm = this.fb.group({
      amount: [0, [Validators.pattern('^[0-9]+$'),Validators.required]],
      discount: [0],
      paymentMethod: ['', Validators.required]
    });
  }

  sumbitForm() {
    this.loading = true;
    this.reservationForm.value.local = this.currentLocal;
    const payment = new PayementsModel();
    if (this.paymentForm.valid){
      payment.amount = this.paymentForm.value.amount;
      payment.rest = this.computeRest(String(payment.amount));
      payment.paymentMethod = this.paymentForm.value.paymentMethod;
      this.reservationForm.value.payements = payment;
      this.reservationForm.value.sejour = this.computeSejour(this.reservationForm.value.dateReservation, this.reservationForm.value.validite);
    }
    if (this.reservationForm.valid){
      const booking = this.initBooking(this.reservationForm);
      console.dir(booking);
      this.reservationService.create(booking, this.localData.userDetails?.userId).subscribe(
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
            'Probleme de communication avec le serveur',
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

  initLocataire() {
    this.reservationForm.get('nom')?.reset('');
    this.reservationForm.get('prenom')?.reset('');
    this.reservationForm.get('telephone')?.reset('');
  }

  computeRest(value: string) : number{
    return this.totalPrice - parseInt(value) - this.discountAmount;
  }

  computeSejour(startDate: string, endDate: string){
    const start = moment(startDate);
    const end = moment(endDate);
    const days = end.diff(start, 'days', true) + 1;
    return days;
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

  private initBooking(reservationForm: FormGroup) {
    const booking = new ReservationModel();
    booking.nom = reservationForm.value.nom;
    booking.prenom = reservationForm.value.prenom;
    booking.telephone = reservationForm.value.telephone;
    booking.sejour = reservationForm.value.sejour;
    booking.dateReservation = reservationForm.value.dateReservation;
    booking.validite = reservationForm.value.validite;
    booking.preriodUnit = reservationForm.value.preriodUnit;
    const local = Object.create(null);
    local.id = reservationForm.value.local.id;
    booking.local = local;

    const payments = new PayementsModel();
    payments.rest = reservationForm.value.payements.rest;
    payments.amount = reservationForm.value.payements.amount;
    payments.paymentMethod = reservationForm.value.payements.paymentMethod;
    booking.payements = [payments];
    return booking;
  }
}
