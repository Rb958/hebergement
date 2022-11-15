import { LocalModel } from './../../../../shared/models/entity/local.model';
import { Subscription } from 'rxjs';
import { LocalService } from './../../../../shared/services/services/local.service';
import { PayementsModel } from './../../../../shared/models/entity/payements.model';
import { HttpStatusCode } from '@angular/common/http';
import { of } from 'rxjs';
import { startWith } from 'rxjs';
import { catchError } from 'rxjs';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DataStateEnum, DataStateProcessing } from 'src/app/shared/utils/data-processing-state';
import { ReservationModel } from 'src/app/shared/models/entity/reservation.model';
import { ReservationService } from 'src/app/shared/services/services/reservation.service';
import { NotifierService } from 'src/app/shared/components/notification/notifier.service';
import { NotificationType } from 'src/app/shared/components/notification/notification-type';
import * as moment from 'moment';
import {MatDialog} from "@angular/material/dialog";
import {LocalHorsServiceComponent} from "../../../local/pages/local-hors-service/local-hors-service.component";
import {BailModel} from "../../../../shared/models/entity/bail.model";
import {OccuperReservationComponent} from "../occuper-reservation/occuper-reservation.component";
import {CloturerReservationComponent} from "../cloturer-reservation/cloturer-reservation.component";

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit {

  currentReservation$: Observable<DataStateProcessing<ReservationModel>> = {} as Observable<DataStateProcessing<ReservationModel>>;

  payments: PayementsModel[] = [];
  loading: boolean = false;
  occuperLocalLoading: boolean = false;

  libererSubscription: Subscription | undefined;

  constructor(
    private reservationService: ReservationService,
    private notifier: NotifierService,
    private route: ActivatedRoute,
    private localService: LocalService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.currentReservation$ = this.reservationService.findById(id).pipe(
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

    this.reservationService.getPayments(id).subscribe(
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
          'Erreur lors de la recuperation de la liste des paiements éffectués. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
          'Details Bail',
          NotificationType.ERROR
        )
      }
    );
  }

  occuperLocal(reservation?: ReservationModel){
    const dialogRef = this.dialog.open(OccuperReservationComponent, {
      width: '400px',
      data: reservation
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.ngOnInit();
      }
    });
  }

  canShow(bail?: ReservationModel){
    return moment(bail?.dateReservation).isBefore(moment(new Date()));
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

  libererLocal(reservationModel?: ReservationModel){
    const dialogRef = this.dialog.open(CloturerReservationComponent, {
      width: '400px',
      data: reservationModel
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.ngOnInit();
      }
    });
  }

  canOccupied(data: ReservationModel | undefined) {
    if (data && data.validite){
      return moment(data.validite).isAfter(new Date()) && data.statut != 'ANNULE' && data.statut != 'CLOTURER';
    }else{
      return false;
    }
  }

  cansClose(data?: ReservationModel) {
    if (data && data.validite){
      return moment(data.validite).isBefore(new Date()) && data.statut != 'ANNULE' && data.statut != 'CLOTURER';
    }else{
      return false;
    }
  }
}
