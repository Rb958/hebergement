import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {PageModel} from "../../../../shared/models/page-model";
import {LocalModel} from "../../../../shared/models/entity/local.model";
import {LocalService} from "../../../../shared/services/services/local.service";
import {HttpStatusCode} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ReservationFormComponent} from "../reservation-form/reservation-form.component";

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.scss']
})
export class NewReservationComponent implements OnInit {
  currentPageIndex = 0;
  currentPageElementSize = 32;
  pagesElementSize = [32, 64, 128, 256];
  locals$: Observable<DataStateProcessing<PageModel<LocalModel>>> = {} as Observable<DataStateProcessing<PageModel<LocalModel>>>;

  constructor(
    private localSevice: LocalService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAvailableLocal();
  }

  findAvailableLocal(queryParam?: any){
    this.locals$ = this.localSevice.findAllAvailabeLocals(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
      map(
        response => {
          if (response.code === HttpStatusCode.Ok){
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

  selectLocal(local: LocalModel) {
    const dialog = this.dialog.open(ReservationFormComponent, {
      width: '1000px',
      data: {
        local
      }
    });
  }
}
