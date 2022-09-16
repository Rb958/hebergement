import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {PageModel} from "../../../../shared/models/page-model";
import {ChartData, ChartType} from "chart.js";
import {BailModel} from "../../../../shared/models/entity/bail.model";
import {HttpStatusCode} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {BailService} from "../../../../shared/services/services/bail.service";
import {DeleteReservationComponent} from "../../../reservation/delete-reservation/delete-reservation.component";

@Component({
  selector: 'app-list-bail-page',
  templateUrl: './list-bail-page.component.html',
  styleUrls: ['./list-bail-page.component.scss']
})
export class ListBailPageComponent implements OnInit {
  currentPageIndex = 0;
  numberOfElement = 0;
  currentPageElementSize = 32;
  pagesElementSize = [32, 64, 128, 256];
  bails$: Observable<DataStateProcessing<PageModel<BailModel>>> = {} as Observable<DataStateProcessing<PageModel<BailModel>>>;
  stats = {};
  // Chart
  public doughnutChartLabels: string[] = [ 'Annulés', 'Confirmé', 'Cloturé' ];
  public doughnutChartData: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bailService: BailService,
    private dialog: MatDialog,
    private notifierService: NotifierService
  ) {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: []
    };
  }

  ngOnInit(): void {
    this.loadData();
    this.getStats();
  }

  newBail() {
    this.router.navigate(['../local-available'], {relativeTo: this.route});
  }

  showBail(bail: BailModel) {

  }

  cancelBail(bail: BailModel) {
    const dialogRef = this.dialog.open(DeleteReservationComponent,{
      width: '400px',
      data: {
        bail: bail
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

  newPayment(bail: BailModel) {

  }

  updateBail(bail: BailModel) {

  }

  pad(number: any) {
    return String(number).padStart(3,'0');
  }

  private loadData(queryParam?: any){
    this.bails$ = this.bailService.getAllBailPaginated(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
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

  getStats(){
    this.bailService.getStats().subscribe(
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
}
