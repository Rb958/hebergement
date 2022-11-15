import { LocalData, AppStore } from 'src/app/shared/utils/app-store';
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LocalModel} from "../../../../shared/models/entity/local.model";
import {ReservationService} from "../../../../shared/services/services/reservation.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocataieSociete, LocataireParticulierModel} from "../../../../shared/models/entity/locataire.model";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {PayementsModel} from "../../../../shared/models/entity/payements.model";
import {ReservationModel} from "../../../../shared/models/entity/reservation.model";
import * as moment from "moment";
import { LocataireService } from 'src/app/shared/services/services/locataire.service';

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
  isLocataire: boolean = false;
  isParticulier: boolean = true;
  totalPrice : number = 0;
  discountAmount : number = 0;
  amountToPay = 0;
  rest: number = 0;
  loading = false;
  localData: LocalData = {} as LocalData;


  constructor(
    private dialogRef: MatDialogRef<ReservationFormComponent>,
    @Inject(MAT_DIALOG_DATA) private local: any,
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private locataireservice: LocataireService,
    private notifier: NotifierService,
    private appStore: AppStore
  ) { }

  ngOnInit(): void {
    this.localData = this.appStore.getData();
    this.loadLocataires();
    this.currentLocal = this.local.local;
    this.totalPrice = this.computeTotalPrice(this.local.startDate, this.local.endDate);
    this.initForm();
  }

  private initForm() {
    this.reservationForm = this.fb.group({
      dateReservation: [this.local.startDate],
      initiateur: [],
      nom: [''],
      prenom: [''],
      telephone: [''],
      sourceInfo: ['', Validators.required],
      validite: [this.local.endDate, Validators.required],
      preriodUnit: [this.currentLocal.typePrix, Validators.required],
      locataireParticulier : this.fb.group({
        id: ['']
      }),
      locataireSociete: this.fb.group({
        id: ['']
      })
    });

    this.paymentForm = this.fb.group({
      amount: [0, [Validators.pattern('^[0-9]+$')]],
      discount: [0],
      paymentMethod: ['', Validators.required]
    });
  }

  private loadLocataires() {
    this.locataireservice.getListLocataireSociete().subscribe(
      apiResponse => {
        if (apiResponse.code == 200){
          this.locatairesSociete = apiResponse.result;
        }
      }
    );
    this.locataireservice.getListLocatairePart().subscribe(
      apiResponse => {
        if (apiResponse.code == 200){
          this.locataireParticulier = apiResponse.result;
        }
      }
    );
  }

  formisValid(){

    if(this.isLocataire){
      // console.log("Is locataire");
      // console.log("is valid : " + this.reservationForm.value.locataireSociete?.id != '' || this.reservationForm.value.locataireParticulier?.id != '' )
      return this.reservationForm.value.locataireSociete?.id != '' || this.reservationForm.value.locataireParticulier?.id != '';
    }else{
      // console.log("Is not locataire");
      // console.log("is valid : "+ this.reservationForm.value.nom.trim() != '' && this.reservationForm.value.telephone.trim() != '' )
      return this.reservationForm.value.nom.trim() != '' && this.reservationForm.value.telephone.trim() != '';
    }
  }

  sumbitForm() {
    this.loading = true;
    this.reservationForm.value.local = this.currentLocal;
    const payment = new PayementsModel();
    if (this.paymentForm.valid){
      payment.amount = this.paymentForm.value.amount;
      payment.rest = this.computeRest(String(payment.amount));
      payment.discount = this.discountAmount;
      payment.paymentMethod = this.paymentForm.value.paymentMethod;
      this.reservationForm.value.payements = payment;
      this.reservationForm.value.sejour = this.computeSejour(this.reservationForm.value.dateReservation, this.reservationForm.value.validite);
    }else{
      this.loading = false;
      this.notifier.notify(
        'Veuiller renseigner tous les champs obligatoire',
        'Formulaire invalide',
        NotificationType.WARNING
      );
    }
    // console.dir(this.reservationForm.value);
    if (this.reservationForm.valid && this.formisValid()){
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
              apiResponse.message,
              'Notification',
              NotificationType.ERROR
            );
          }
        },
        error => {
          this.loading = false;
          this.notifier.notify(
            'Erreur lors de la creation de la reservation. Veuiller rééssayer. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
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
    if(this.isLocataire){
      if (!this.isLocataire){
        this.reservationForm.get('nom')?.reset('');
        this.reservationForm.get('prenom')?.reset('');
        this.reservationForm.get('telephone')?.reset('');
      } else{
        this.reservationForm.get('locataireSociete')?.get('id')?.reset('');
        this.reservationForm.get('locataireParticulier')?.get('id')?.reset('');
      }
    }else{
      this.reservationForm.get('nom')?.reset('');
      this.reservationForm.get('prenom')?.reset('');
      this.reservationForm.get('telephone')?.reset('');
    }
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
    this.amountToPay = this.totalPrice - this.discountAmount;
    return this.discountAmount;
  }

  getTotalPrice(){
    return this.totalPrice - this.discountAmount;
  }

  private initBooking(reservationForm: FormGroup) {
    const booking = new ReservationModel();
    if (this.isLocataire) {
      booking.locataireSociete = (reservationForm.value.locataireSociete?.id) ? reservationForm.value.locataireSociete : null;
      booking.locataireParticulier = (reservationForm.value.locataireParticulier?.id) ? reservationForm.value.locataireParticulier : null;
    }else{
      booking.nom = reservationForm.value.nom;
      booking.prenom = reservationForm.value.prenom;
      booking.telephone = reservationForm.value.telephone;
    }
    booking.sejour = reservationForm.value.sejour;
    booking.dateReservation = reservationForm.value.dateReservation;
    // booking.indiceEntre = reservationForm.value.indiceEntre;
    booking.validite = reservationForm.value.validite;
    booking.sourceInfo = reservationForm.value.sourceInfo;
    booking.preriodUnit = reservationForm.value.preriodUnit;
    const local = Object.create(null);
    local.id = reservationForm.value.local.id;
    booking.local = local;

    const payments = new PayementsModel();
    payments.rest = reservationForm.value.payements.rest;
    payments.discount = this.discountAmount;
    payments.amount = reservationForm.value.payements.amount;
    payments.paymentMethod = reservationForm.value.payements.paymentMethod;
    booking.payements = [payments];
    return booking;
  }

  initAnonymousForm() {
    if (this.isParticulier){
      this.reservationForm.get('locataireParticulier')?.get('id')?.reset('');
    }else{
      this.reservationForm.get('locataireSociete')?.get('id')?.reset('');
    }
  }

}
