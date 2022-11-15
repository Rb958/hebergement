import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocataieSociete, LocataireParticulierModel} from "../../../../shared/models/entity/locataire.model";
import {LocalModel} from "../../../../shared/models/entity/local.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {LocataireService} from "../../../../shared/services/services/locataire.service";
import {PayementsModel} from "../../../../shared/models/entity/payements.model";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {BailService} from "../../../../shared/services/services/bail.service";
import {BailModel} from "../../../../shared/models/entity/bail.model";
import { AppStore, LocalData } from 'src/app/shared/utils/app-store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-bail',
  templateUrl: './new-bail.component.html',
  styleUrls: ['./new-bail.component.scss']
})
export class NewBailComponent implements OnInit {

  reservationForm: FormGroup = {} as FormGroup;
  paymentForm: FormGroup = {} as FormGroup;
  locatairesSociete: Array<LocataieSociete> = [];
  locataireParticulier: Array<LocataireParticulierModel> = [];
  currentLocal : LocalModel = {} as LocalModel;
  isLocataire: boolean = true;
  isParticulier: boolean = true;
  totalPrice : number = 0;
  discountAmount : number = 0;
  caution: number = 0;
  amountToPay = 0;
  rest: number = 0;
  sejour: number = 0;
  loading = false;

  uploadSuccess: boolean = false;
  uploadError: boolean = false;
  uploadedFileLink: string | undefined;

  uploadSubscription: Subscription | undefined;

  localData: LocalData = {} as LocalData;

  constructor(
    private dialogRef: MatDialogRef<NewBailComponent>,
    @Inject(MAT_DIALOG_DATA) private local: LocalModel,
    private bailService: BailService,
    private fb: FormBuilder,
    private appStore: AppStore,
    private notifier: NotifierService,
    private locataireservice: LocataireService
  ) { }

  ngOnInit(): void {
    this.localData = this.appStore.getData();
    this.currentLocal = this.local;
    // this.totalPrice = this.computeTotalPrice(this.local.startDate, this.local.endDate);
    this.initForm();
    this.loadLocataires();
    this.computeTotalPrice();
  }

  private initForm() {
    this.reservationForm = this.fb.group({
      dateEntre: ['', Validators.required],
      period: [1, Validators.required],
      caution: [0, Validators.required],
      cautionPeriod: [0, Validators.required],
      preriodUnit: [this.currentLocal.typePrix, Validators.required],
      sourceInfo: ['', Validators.required],
      // indiceEntre: ['', Validators.required],
      locataireSociete: this.fb.group({
        id: ['']
      }),
      locataireParticulier: this.fb.group({
        id: ['']
      })
    });

    this.paymentForm = this.fb.group({
      amount: [0, [Validators.pattern('^[0-9]+$'),Validators.required]],
      discount: [0],
      paymentMethod: ['', Validators.required]
    });
  }

  processFinished(event: any) {
    this.uploadSuccess = true;
    this.uploadedFileLink = event.ref;
  }

  handleError(event: any) {
    this.uploadError = true;
  }

  sumbitForm() {
    this.loading = true;
    this.reservationForm.value.local = this.currentLocal;
    const payment = new PayementsModel();
    if(this.paymentForm.value.amount > this.totalPrice){
      this.loading = false;
      this.notifier.notify(
        'Le montant à payer doit etre inferieur ou égale au net à payer',
        'Enregistrement d\'un bail',
        NotificationType.ERROR
      );
      return;
    }
    if (this.paymentForm.valid){
      payment.amount = this.paymentForm.value.amount;
      payment.rest = this.computeRest(String(payment.amount));
      payment.discount = this.discountAmount;
      payment.paymentMethod = this.paymentForm.value.paymentMethod;
      this.reservationForm.value.payements = payment;
    }else{
      this.loading = false;
      this.notifier.notify(
        'Veuiller renseigner tous les champs obligatoire',
        'Formulaire invalide',
        NotificationType.ERROR
      );
      return;
    }
    if (this.reservationForm.valid && this.uploadSuccess){
      const booking = this.initBooking(this.reservationForm);
      this.bailService.create(booking, this.localData.userDetails?.userId).subscribe(
        apiResponse => {
          if (apiResponse.code == 200){
            this.notifier.notify(
              'Local réservé avec succes',
              'Enregistrement d\'un bail',
              NotificationType.SUCCESS
            );
            this.loading = false;
            this.dialogRef.close(apiResponse.result);
          }else{
            this.loading = false;
            this.notifier.notify(
              'Erreur lors de la creation de la reservation. Veuiller rééssayer',
              'Enregistrement d\'un bail',
              NotificationType.ERROR
            );
          }
        },
        error => {
          this.loading = false;
          this.notifier.notify(
            'Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
            'Enregistrement d\'un bail',
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
    if (!this.isLocataire){
      this.reservationForm.get('nom')?.reset('');
      this.reservationForm.get('prenom')?.reset('');
      this.reservationForm.get('telephone')?.reset('');
    } else{
      this.reservationForm.get('locataireSociete')?.get('id')?.reset('');
      this.reservationForm.get('locataireParticulier')?.get('id')?.reset('');

    }
  }

  computeCaution(cautionPeriod: HTMLInputElement, caution: HTMLInputElement){
    this.caution = parseInt(caution?.value) * parseInt(cautionPeriod?.value);
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
    return this.totalPrice - parseInt(value) - this.discountAmount;
  }

  computAmountToPay(){
    return this.totalPrice - this.discountAmount;
  }

  computeTotalPrice(period?: HTMLInputElement, caution?: HTMLInputElement, cautionPeriodInput?: HTMLInputElement) {
    if(period && caution && cautionPeriodInput){
      // console.log("period : " + period.value + "\nCaution : "+ caution.value + "caution period : " + cautionPeriodInput.value);
      const tmpPeriod = parseInt(period.value);
      const tmpCaution = parseInt(caution.value) * parseInt(cautionPeriodInput.value);
      this.totalPrice = (this.currentLocal.prix * tmpPeriod) + tmpCaution;
    }else{
      this.totalPrice = (this.currentLocal.prix * this.reservationForm.value.period) + this.reservationForm.value.caution;
    }
    // this.amountToPay = this.totalPrice - this.discountAmount;
    return this.totalPrice;
  }

  computeDiscount(discount: string) {
    this.discountAmount = Math.ceil((this.totalPrice * parseInt(discount)) / 100);
    this.amountToPay = this.totalPrice - this.discountAmount;
    return this.discountAmount;
  }

  private initBooking(reservationForm: FormGroup) {
    const bail = new BailModel();
    bail.sejour = reservationForm.value.sejour;
    bail.dateEntre = reservationForm.value.dateEntre;
    bail.validite = reservationForm.value.validite;
    bail.preriodUnit = reservationForm.value.preriodUnit;
    bail.sejour = reservationForm.value.period;
    bail.sourceInfo = reservationForm.value.sourceInfo;
    bail.totalAmount = this.amountToPay;
    bail.caution = reservationForm.value.caution;
    bail.cautionPeriod = reservationForm.value.cautionPeriod;
    // bail.indiceEntre = reservationForm.value.indiceEntre;
    const local = Object.create(null);
    local.id = reservationForm.value.local.id;
    bail.local = local;
    bail.locataireSociete = (reservationForm.value.locataireSociete?.id) ? reservationForm.value.locataireSociete : null;
    bail.locataireParticulier = (reservationForm.value.locataireParticulier?.id) ? reservationForm.value.locataireParticulier : null;
    bail.pj = this.uploadedFileLink;

    const payment = new PayementsModel();
    payment.amount = this.paymentForm.value.amount;
    payment.rest = this.computeRest(String(payment.amount));
    payment.discount = this.discountAmount;
    payment.paymentMethod = this.paymentForm.value.paymentMethod;

    bail.payements = [payment];
    return bail;
  }

}
