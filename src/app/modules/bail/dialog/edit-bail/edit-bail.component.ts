import { DomSanitizer } from '@angular/platform-browser';
import { BailModel } from './../../../../shared/models/entity/bail.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NotifierService } from 'src/app/shared/components/notification/notifier.service';
import { LocalModel } from 'src/app/shared/models/entity/local.model';
import { LocataieSociete, LocataireParticulierModel } from 'src/app/shared/models/entity/locataire.model';
import { BailService } from 'src/app/shared/services/services/bail.service';
import { LocataireService } from 'src/app/shared/services/services/locataire.service';
import { AppStore, LocalData } from 'src/app/shared/utils/app-store';
import { NewBailComponent } from '../new-bail/new-bail.component';
import { NotificationType } from 'src/app/shared/components/notification/notification-type';
import { Env } from 'src/app/shared/utils/Env';
import { PayementsModel } from 'src/app/shared/models/entity/payements.model';

@Component({
  selector: 'app-edit-bail',
  templateUrl: './edit-bail.component.html',
  styleUrls: ['./edit-bail.component.scss']
})
export class EditBailComponent implements OnInit {

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
  sejour: number = 0;
  loading = false;

  uploadSuccess: boolean = false;
  uploadError: boolean = false;
  uploadedFileLink: string | undefined;

  uploadSubscription: Subscription | undefined;

  localData: LocalData = {} as LocalData;

  constructor(
    private dialogRef: MatDialogRef<NewBailComponent>,
    @Inject(MAT_DIALOG_DATA) private bail: BailModel,
    private bailService: BailService,
    private fb: FormBuilder,
    private appStore: AppStore,
    private notifier: NotifierService,
    private locataireservice: LocataireService,
    private sanitize: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.isParticulier = this.bail.locataireParticulier ? true : false;
    this.localData = this.appStore.getData();
    this.initForm(this.bail);
    this.loadLocataires();
  }

  private initForm(bail?: BailModel) {
    if(bail){
      this.reservationForm = this.fb.group({
        dateEntre: [bail.dateEntre],
        locataireSociete: this.fb.group({
          id: [bail.locataireSociete ? bail.locataireSociete?.id : '']
        }),
        locataireParticulier: this.fb.group({
          id: [bail.locataireParticulier ? bail.locataireParticulier?.id : '']
        })
      });
    }else{
      this.reservationForm = this.fb.group({
        dateEntre: [''],
        locataireSociete: this.fb.group({
          id: ['']
        }),
        locataireParticulier: this.fb.group({
          id: ['']
        })
      });
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

  processFinished(event: any) {
    this.uploadSuccess = true;
    this.uploadedFileLink = event.ref;
  }

  handleError(event: any) {
    this.uploadError = true;
  }

  sumbitForm() {
    if (this.reservationForm.valid && this.uploadSuccess){
      this.bail.dateEntre = this.reservationForm.value.dateEntre;
      this.bail.validite = this.reservationForm.value.validite;
      this.bail.locataireSociete = (this.reservationForm.value.locataireSociete?.id) ? this.reservationForm.value.locataireSociete : null;
      this.bail.locataireParticulier = (this.reservationForm.value.locataireParticulier?.id) ? this.reservationForm.value.locataireParticulier : null;
      this.bail.pj = this.uploadedFileLink;
      this.bailService.update(this.bail, this.localData.userDetails?.userId).subscribe(
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
    }
  }

  getSanitizeLink(){
    const server = Env.getEnv().server;
    return this.sanitize.bypassSecurityTrustResourceUrl(server + "api/bail/receipt/" + this.bail.id);
  }

}
