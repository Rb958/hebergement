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
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {ChartData, ChartType} from "chart.js";

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

  // Chart
  public doughnutChartLabels: string[] = [ '', 'Libre', 'Hors service' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [ 350, 450, 100 ],
        backgroundColor: [
          'rgb(255,0,38)',
          'rgb(30,159,51)',
          'rgb(86,91,97)'
        ],
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private dialog: MatDialog,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.loadData();
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

  updateBooking(reservation: ReservationModel) {

  }
}
