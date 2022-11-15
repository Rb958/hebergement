import { catchError, map, Observable, of, startWith } from 'rxjs';
import { ReservationService } from './../../../../shared/services/services/reservation.service';
import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {LocalModel} from "../../../../shared/models/entity/local.model";
import {ReservationModel} from "../../../../shared/models/entity/reservation.model";
import {LocalService} from "../../../../shared/services/services/local.service";
import * as moment from "moment";
import {ActivatedRoute, Router} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { NotifierService } from 'src/app/shared/components/notification/notifier.service';
import { DataStateEnum, DataStateProcessing } from 'src/app/shared/utils/data-processing-state';
import { Env } from 'src/app/shared/utils/Env';
import { DeleteReservationComponent } from '../../delete-reservation/delete-reservation.component';
import { NewPaymentsComponent } from '../new-payments/new-payments.component';
import { PageModel } from 'src/app/shared/models/page-model';

@Component({
  selector: 'app-calendrier-reservation',
  templateUrl: './calendrier-reservation.component.html',
  styleUrls: ['./calendrier-reservation.component.scss']
})
export class CalendrierReservationComponent implements OnInit {

  currentPageIndex = 0;
  numberOfElement = 0;
  currentPageElementSize = 32;
  pagesElementSize = [32, 64, 128, 256];

  reservation$: Observable<DataStateProcessing<PageModel<ReservationModel>>> = {} as Observable<DataStateProcessing<PageModel<ReservationModel>>>;

  locals: Array<LocalModel> = [];
  monthlyBookings: Array<ReservationModel> = [];
  currentYear = moment().year();
  currentMonth = moment().month() + 1;

  constructor(
    private localService: LocalService,
    private router: Router,
    private route: ActivatedRoute,
    private bookingService: ReservationService,
    private reservationService: ReservationService,
    private dialog: MatDialog,
    private notifierService: NotifierService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadLocals();
    this.loadData();
  }

  onSelectDate(data: any) {
    // console.dir(data);
  }

  private loadLocals() {
    this.localService.findmeuble().subscribe(
      apiResponse => {
        if (apiResponse.code == 200){
          apiResponse.result.map((item: LocalModel) => {
            this.locals = apiResponse.result;
          });
        }
      }
    );
  }

  newReservation() {
    this.router.navigate(['../local-available'], {relativeTo: this.route});
  }

  cancelBooking(reservation: ReservationModel) {
    const dialogRef = this.dialog.open(DeleteReservationComponent,{
      width: '400px',
      data: {
        booking: reservation
      }
    });
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

  // newReservation() {
  //   this.router.navigate(['../local-available'], {relativeTo: this.route});
  // }

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

  // getStats(){
  //   this.reservationService.getStats().subscribe(
  //     apiResponse => {
  //       if (apiResponse.code == 200){
  //         this.stats = apiResponse.result;
  //         this.doughnutChartData = {
  //           labels: this.doughnutChartLabels,
  //           datasets: [{
  //             data: [
  //               apiResponse.result.canceled,
  //               apiResponse.result.confirmed,
  //               apiResponse.result.closed,
  //               // apiResponse.result.canceled,
  //             ],
  //             backgroundColor: [
  //               'rgb(255,0,38)',
  //               'rgb(30,159,51)',
  //               'rgb(86,91,97)'
  //             ],
  //           }
  //           ]
  //         }
  //       }
  //     }
  //   );
  // }

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
