import { LocalData, AppStore } from 'src/app/shared/utils/app-store';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, of, startWith } from 'rxjs';
import { DepenseService } from './../../../../shared/services/services/depense.service';
import { NotifierService } from './../../../../shared/components/notification/notifier.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, Pipe } from '@angular/core';
import { DataStateEnum, DataStateProcessing } from 'src/app/shared/utils/data-processing-state';
import { DepenseModel } from 'src/app/shared/models/entity/depense.model';
import { HttpStatusCode } from '@angular/common/http';
import { DepensePaymentComponent } from '../depense-payment/depense-payment.component';
import { NotificationType } from 'src/app/shared/components/notification/notification-type';
import { PayementsModel } from 'src/app/shared/models/entity/payements.model';

@Component({
  selector: 'app-depense-details',
  templateUrl: './depense-details.component.html',
  styleUrls: ['./depense-details.component.scss']
})
export class DepenseDetailsComponent implements OnInit {

  depense$ : Observable<DataStateProcessing<DepenseModel>> = {} as Observable<DataStateProcessing<DepenseModel>>
  currentDepenseId: any;
  currentDepense: DepenseModel = {} as DepenseModel;
  validationLoading: boolean = false;
  rejectionLoading: boolean = false;
  localData: LocalData = {} as LocalData;

  payments: Array<PayementsModel> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notifier: NotifierService,
    private dialog: MatDialog,
    private depenseService: DepenseService,
    private appStore: AppStore
  ) {}

  ngOnInit(): void {
    this.localData = this.appStore.getData();
    this.currentDepenseId = this.route.snapshot.paramMap.get("id");
    this.loadData(this.currentDepenseId);
  }

  loadData(id: any){
    this.depense$ = this.depenseService.findById(id).pipe(
      map(
        response => {
          if (response.code === HttpStatusCode.Ok){
            this.currentDepense = response.result;
            return {dataState: DataStateEnum.LOADED, message: response.message, data: response.result}
          }else {
            return {dataState: DataStateEnum.ERROR, message: response.message}
          }
        }
      ),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, message: err.error.error}))
    );

    this.depenseService.findPayment(id).subscribe(
      apiResponse => {
        if(apiResponse.code == HttpStatusCode.Ok.valueOf()){
          this.payments = apiResponse.result;
        }else{
          this.notifier.notify(
            'Erreur lors de la recuperation de la liste des paiements éffectués',
            'Details Bail',
            NotificationType.ERROR
          )
        }
      },
      error => {
        this.notifier.notify(
          'Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
          'Details Bail',
          NotificationType.ERROR
        )
      }
    );
  }

  validatePayment(currentDepense: DepenseModel, payment: PayementsModel){
    this.validationLoading = true;
    this.depenseService.validatePayment(currentDepense.id, payment.id, this.localData.userDetails?.userId).subscribe(
      apiResponse => {
        if(apiResponse.code == HttpStatusCode.Ok.valueOf()){
          this.payments = apiResponse.result;
          this.notifier.notify(
            apiResponse.message,
            'Details Bail',
            NotificationType.SUCCESS
          );
          this.ngOnInit();
          this.validationLoading = false;
        }else{
          this.notifier.notify(
            'Erreur lors de la Validation du paiement : '+ apiResponse.message,
            'Details Bail',
            NotificationType.ERROR
          );
          this.validationLoading = false;
        }
      },
      error => {
        this.notifier.notify(
          'Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
          'Details Bail',
          NotificationType.ERROR
        );
        this.validationLoading = false;
      }
    );
  }

  rejectPayment(currentDepense: DepenseModel, payment: PayementsModel){
    this.rejectionLoading = true;
    this.depenseService.rejectPayment(currentDepense.id, payment.id, this.localData.userDetails?.userId).subscribe(
      apiResponse => {
        if(apiResponse.code == HttpStatusCode.Ok.valueOf()){
          this.payments = apiResponse.result;
          this.notifier.notify(
            apiResponse.message,
            'Details Bail',
            NotificationType.SUCCESS
          );
          this.ngOnInit();
          this.rejectionLoading = false;
        }else{
          this.notifier.notify(
            'Erreur lors du rejet du paiement : '+ apiResponse.message,
            'Details Bail',
            NotificationType.ERROR
          );
          this.rejectionLoading = false;
        }
      },
      error => {
        this.notifier.notify(
          'Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
          'Details Bail',
          NotificationType.ERROR
        );
        this.rejectionLoading = false;
      }
    );
  }

  addPayment(depense: DepenseModel){
    const dialogRef = this.dialog.open(DepensePaymentComponent, {
      width: '700px',
      data: depense
    });
    dialogRef.afterClosed().subscribe(result =>{
        this.loadData(this.currentDepenseId);
      }
    );
  }

  getStatusStyle(depenseStatus: string | undefined){
    if(depenseStatus){
      switch (depenseStatus) {
        case 'VALIDE':
          return 'chip-success';
        case 'CLOTURE':
          return 'chip-danger'
        case 'REFUSE':
          return 'chip-blue';
        default :
          return 'chip-warning'
      }
    }else{
      return 'chip-warning';
    }
  }

  getStyle(status: string){
    switch (status) {
      case 'VALIDATED':
        return 'chip-success';
      case 'REJECTED':
        return 'chip-danger';
      default:
        return 'chip-warning';
    }
  }

  getPeymentStatusStyle(paymentStatus: any){
    switch (paymentStatus) {
      case 'PAYE':
        return 'chip-success';
      case 'IMPAYE':
        return 'chip-danger';
      default:
        return 'chip-warning';
    }
  }
}

