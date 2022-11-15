import { ChangeLocalComponent } from './../../dialog/change-local/change-local.component';
import { MatDialog } from '@angular/material/dialog';
import { LocalService } from './../../../../shared/services/services/local.service';
import { LocalModel } from 'src/app/shared/models/entity/local.model';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, startWith, catchError, of, Subscription } from 'rxjs';
import { NotificationType } from 'src/app/shared/components/notification/notification-type';
import { NotifierService } from 'src/app/shared/components/notification/notifier.service';
import { BailModel } from 'src/app/shared/models/entity/bail.model';
import { PayementsModel } from 'src/app/shared/models/entity/payements.model';
import { BailService } from 'src/app/shared/services/services/bail.service';
import { DataStateProcessing, DataStateEnum } from 'src/app/shared/utils/data-processing-state';
import { Env } from 'src/app/shared/utils/Env';
import * as moment from 'moment';
import {LocalHorsServiceComponent} from "../../../local/pages/local-hors-service/local-hors-service.component";
import {OccuperLocalDialogComponent} from "../../dialog/occuper-local-dialog/occuper-local-dialog.component";
import {CloturerBailComponent} from "../../dialog/cloturer-bail/cloturer-bail.component";

@Component({
  selector: 'app-bail-details-page',
  templateUrl: './bail-details-page.component.html',
  styleUrls: ['./bail-details-page.component.scss']
})
export class BailDetailsPageComponent implements OnInit, OnDestroy {

  currentBail$: Observable<DataStateProcessing<BailModel>> = {} as Observable<DataStateProcessing<BailModel>>;

  payments: Array<PayementsModel> = [];
  occuperLocalLoading: boolean = false;
  loading: boolean = false;

  paymentsSubscription: Subscription | undefined;
  libererSubscription: Subscription | undefined;
  currentDate = new Date();

  constructor(
    private bailService: BailService,
    private localService: LocalService,
    private notifier: NotifierService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.currentBail$ = this.bailService.findById(id).pipe(
      map(response => {
        if (response.code === HttpStatusCode.Ok){
          return {dataState: DataStateEnum.LOADED, message: response.message, data: response.result}
        }else {
          return {dataState: DataStateEnum.ERROR, message: response.message}
        }
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, message: err.error.error}))
    );
    this.paymentsSubscription = this.bailService.getPayments(id).subscribe(
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

  getSanitizedLink(pj?: string){
    const server = Env.getEnv().server;
    return this.sanitizer.bypassSecurityTrustResourceUrl(server + "api/file/"+pj);
  }

  occuperLocal(bail?: BailModel){
    const dialogRef = this.dialog.open(OccuperLocalDialogComponent, {
      width: '400px',
      data: bail,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.ngOnInit();
      }
    });
  }

  changeLocal(bail?: BailModel){
    const dialogRef = this.dialog.open(ChangeLocalComponent, {
      width: '700px',
      data: bail
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  canShow(bail?: BailModel){
    return moment(bail?.dateEntre).isBefore(moment(new Date())) || moment(bail?.echeance).isAfter(moment(new Date()));
  }

  miseHosService(local?: LocalModel){
    const dialogRef = this.dialog.open(LocalHorsServiceComponent, {
      width: '400px',
      data: local
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.ngOnInit();
      }
    });
  }

  libererLocal(bail?: BailModel){
    this.occuperLocalLoading = true;
    const dialogRef = this.dialog.open(CloturerBailComponent, {
      width: '400px',
      data: bail,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.ngOnInit();
      }
    });
  }

  ngOnDestroy(): void {
    if(this.paymentsSubscription){
      this.paymentsSubscription.unsubscribe();
    }
  }

  getLocalStatusStyle(status?: string | null): string{
    switch (status) {
      case 'LIBRE':
        return 'valid';
      case 'OCCUPE':
        return 'close';
      case 'HORS_SERVICE':
        default:
        return 'progress';
    }
  }

  canOccupied(data: BailModel | undefined) {
    if (data && data.validite){
      return moment(data.validite).isAfter(new Date()) && data.statut != 'ANNULE';
    }else{
      return false;
    }
  }

  canClose(data: BailModel | undefined) {
    if (data && data.validite){
      return moment(data.validite).isBefore(new Date()) && data.statut != 'ANNULE';
    }else{
      return false;
    }
  }
}
