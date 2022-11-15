import { LocalData, AppStore } from 'src/app/shared/utils/app-store';
import { RembourseReservationComponent } from './../rembourse-reservation/rembourse-reservation.component';
import { Env } from './../../../../shared/utils/Env';
import { DomSanitizer } from '@angular/platform-browser';
import { NewPaymentsComponent } from './../new-payments/new-payments.component';
import {Component, OnInit} from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {PageModel} from "../../../../shared/models/page-model";
import {ReservationModel} from "../../../../shared/models/entity/reservation.model";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpStatusCode} from "@angular/common/http";
import {ReservationService} from "../../../../shared/services/services/reservation.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteReservationComponent} from "../../delete-reservation/delete-reservation.component";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {ChartData, ChartType} from "chart.js";
import * as moment from 'moment';
import { NotificationType } from 'src/app/shared/components/notification/notification-type';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  currentPageIndex = 0;
  numberOfElement = 0;
  currentPageElementSize = 32;
  pagesElementSize = [32, 64, 128, 256];
  reservation$: Observable<DataStateProcessing<PageModel<ReservationModel>>> = {} as Observable<DataStateProcessing<PageModel<ReservationModel>>>;
  stats = {};
  localData: LocalData | undefined;
  // Chart
  public doughnutChartLabels: string[] = [ 'Annulés', 'Confirmé', 'Cloturé' ];
  public doughnutChartData: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private dialog: MatDialog,
    private notifierService: NotifierService,
    private sanitizer: DomSanitizer,
    private appStore: AppStore
  ) {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: []
    };
  }

  ngOnInit(): void {
    this.localData = this.appStore.getData();
    this.loadData();
    this.getStats();
  }

  notEnd(bail: ReservationModel){
    return moment(bail.validite).isAfter(moment(new Date()));
  }

  cancelBooking(reservation: ReservationModel) {
    let dialogRef;
    if (this.notEnd(reservation)) {
      if(this.localData?.userDetails?.role == 'ROLEADMIN'){
        dialogRef = this.dialog.open(RembourseReservationComponent,{
          width: '700px',
          data: reservation
        });
      }else{
        this.notifierService.notify(
          "Vous n'êtes pas autorisé à effectuer: Seule un administrateur peut traiter ce cas",
          "Annulation d'une reservation",
          NotificationType.ERROR
        );
        return ;
      }
    }else{
      dialogRef = this.dialog.open(DeleteReservationComponent,{
        width: '400px',
        data: {
          booking: reservation
        }
      });
    }

    dialogRef.afterClosed().subscribe(
      result => {
        if (result){
          this.loadData();
        }
      }
    );
  }

  onOpenDetails(reservation: ReservationModel) {
    this.router.navigate(['../details', reservation.id], {relativeTo: this.route})
  }

  private loadData(queryParam?: any){
    this.reservation$ = this.reservationService.getAllReservationPaginated(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
      map(
        response => {
          if (response.code === HttpStatusCode.Ok){
            this.currentPageElementSize = response.result.size;
            this.numberOfElement = response.result.totalElements;
            this.currentPageIndex = response.result.pageable.pageNumber;
            return {dataState: DataStateEnum.LOADED, message: response.message, data: response.result}
          }else {
            return {dataState: DataStateEnum.ERROR, message: response.message}
          }
        }
      ),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, message: err.error.error}))
    );
  }

  newReservation() {
    this.router.navigate(['../local-available'], {relativeTo: this.route});
  }

  openPayment(reservation: ReservationModel){
    const dialogRef = this.dialog.open(NewPaymentsComponent,{
      width: '700px',
      data: reservation
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result){
          this.ngOnInit();
        }
      }
    );
  }

  updateBooking(reservation: ReservationModel) {

  }

  pad(number: number) {
    return String(number).padStart(3,'0');
  }

  getStats(){
    this.reservationService.getStats().subscribe(
      apiResponse => {
        if (apiResponse.code == 200){
          this.stats = apiResponse.result;
          this.doughnutChartData = {
            labels: this.doughnutChartLabels,
            datasets: [{
              data: [
                apiResponse.result.canceled,
                apiResponse.result.confirmed,
                apiResponse.result.closed,
                // apiResponse.result.canceled,
              ],
              backgroundColor: [
                'rgb(255,0,38)',
                'rgb(30,159,51)',
                'rgb(86,91,97)'
              ],
            }

            ]
          }
        }
      }
    );
  }

  getDownloadLink(reservation: ReservationModel){
    const server = Env.getEnv().server;
    return this.sanitizer.bypassSecurityTrustResourceUrl(server + 'api/booking/receipt/' + reservation.id);
  }

  getBookingStatusStyle(status?: string | null){
    if(status)
      switch (status) {
        case 'CONFIRME':
          return 'chip-success';
        case 'CLOTURER':
          return 'chip-blue';
        case 'ATTENTE':
          return 'chip-warning';
        case 'ANNULE':
        default:
          return 'chip-danger';
      }
    else
      return 'chip-warning';
  }

  getPaymentStatusStyle(status?: string | null){
    if(status){
      switch (status) {
        case 'PAYE':
          return 'chip-success';
        case 'IMPAYE':
          return 'chip-danger'
        case 'REMBOURSÉ':
          return 'chip-blue';
        default :
          return 'chip-warning'
      }
    }else{
      return 'chip-warning';
    }
  }
}
