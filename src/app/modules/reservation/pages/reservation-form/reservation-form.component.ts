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
  rest: number = 0;

  constructor(
    private dialogRef: MatDialogRef<ReservationFormComponent>,
    @Inject(MAT_DIALOG_DATA) private local: any,
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private notifier: NotifierService,
    private locataireservice: LocataireService
  ) { }

  ngOnInit(): void {
    this.currentLocal = this.local.local;
    this.initForm();
    this.loadLocataires();
  }

  private initForm() {
    this.reservationForm = this.fb.group({
      dateReservation: [''],
      initiateur: [''],
      nom: [''],
      prenom: [''],
      telephone: [''],
      sejour: ['', Validators.required],
      preriodUnit: [this.currentLocal.typePrix, Validators.required],
      locataireSociete: this.fb.group({
        id: ['']
      }),
      locataireParticulier: this.fb.group({
        id: ['']
      })
    });

    this.paymentForm = this.fb.group({
      amount: ['', [Validators.pattern('^[0-9]+$')]],
      paymentMethod: ['']
    });
  }

  sumbitForm() {
    this.reservationForm.value.local = this.currentLocal;
    const payment = new PayementsModel();
    if (this.paymentForm.valid){
      payment.amount = this.paymentForm.value.amount;
      payment.rest = this.computeRest(String(payment.amount));
      this.reservationForm.value.payements = payment;
    }
    if (this.reservationForm.valid){
      const booking = this.initBooking(this.reservationForm);
      this.reservationService.create(booking).subscribe(
        apiResponse => {
          if (apiResponse.code == 200){
            this.notifier.notify(
              'Local réservé avec succes',
              'Notification',
              NotificationType.SUCCESS
            );
            this.dialogRef.close(apiResponse.result);
          }else{
            this.notifier.notify(
              'Erreur lors de la creation de la reservation. Veuiller rééssayer',
              'Notification',
              NotificationType.ERROR
            );
          }
        },
        error => {
          this.notifier.notify(
            'Probleme de communication avec le serveur',
            'Notification',
            NotificationType.ERROR
          );
        }
      );
    }else{
      this.notifier.notify(
        'Le formulaire de reservation est invalide veuiller verifier les diferents champs',
        'Notification',
        NotificationType.WARNING
      );
    }
  }

  initLocataire() {
    if (!this.isLocataire){
      this.reservationForm.get('nom')?.reset('');
      this.reservationForm.get('prenom')?.reset('');
      this.reservationForm.get('telephone')?.reset('');
    } else{
      this.reservationForm.get('locataireSociete')?.get('id')?.reset('');
      this.reservationForm.get('locataireParticulier')?.get('id')?.reset('');

    }
  }

  initAnonymousForm() {
    if (this.isParticulier){
      this.reservationForm.get('locataireParticulier')?.get('id')?.reset('');
    }else{
      this.reservationForm.get('locataireSociete')?.get('id')?.reset('');
    }
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

  computeRest(value: string) : number{
    return this.totalPrice - parseInt(value);
  }

  computeTotalPrice(value: string) {
    return this.totalPrice = this.currentLocal.prix * parseInt(value)
  }

  private initBooking(reservationForm: FormGroup) {
    const booking = new ReservationModel();
    booking.nom = reservationForm.value.nom;
    booking.prenom = reservationForm.value.prenom;
    booking.telephone = reservationForm.value.telephone;
    booking.sejour = reservationForm.value.sejour;
    booking.preriodUnit = reservationForm.value.preriodUnit;
    const local = Object.create(null);
    local.id = reservationForm.value.local.id;
    booking.local = local;
    booking.locataireSociete = (reservationForm.value.locataireSociete?.id) ? reservationForm.value.locataireSociete : null;
    booking.locataireParticulier = (reservationForm.value.locataireParticulier?.id) ? reservationForm.value.locataireParticulier : null;

    const payments = new PayementsModel();
    payments.rest = reservationForm.value.payements.rest;
    payments.amount = reservationForm.value.payements.amount;

    booking.payements = [payments];
    return booking;
  }
}
