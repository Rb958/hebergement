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

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit {

  currentReservation$: Observable<DataStateProcessing<ReservationModel>> = {} as Observable<DataStateProcessing<ReservationModel>>;
  
  constructor(
    private reservationService: ReservationService,
    private notifier: NotifierService,
    private route: ActivatedRoute
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
  }
}
