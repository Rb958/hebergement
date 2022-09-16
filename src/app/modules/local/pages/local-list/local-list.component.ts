import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of, startWith, tap} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {PageModel} from "../../../../shared/models/page-model";
import {LocalModel} from "../../../../shared/models/entity/local.model";
import {MatDialog} from "@angular/material/dialog";
import {HttpStatusCode} from "@angular/common/http";
import {LocalService} from "../../../../shared/services/services/local.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteLocalComponent} from "../../dialogs/delete-local/delete-local.component";
import {EnableLocalComponent} from "../../enable-local/enable-local.component";
import {ChartData, ChartType} from "chart.js";

@Component({
  selector: 'app-local-list',
  templateUrl: './local-list.component.html',
  styleUrls: ['./local-list.component.scss']
})
export class LocalListComponent implements OnInit {

  searchValue = '';

  currentPageElementSize = 32;
  currentPageIndex = 0;
  pagesElementSize = [32, 64, 128, 256];
  numberOfElements = 0;

  totalPage = 0;


  locals$: Observable<DataStateProcessing<PageModel<LocalModel>>> = {} as Observable<DataStateProcessing<PageModel<LocalModel>>>;
  public doughnutChartLabels: string[] = [ 'Occupé', 'Libre', 'Hors service' ];
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
    private dialog: MatDialog,
    private localService: LocalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(queryParam?: any){
    this.locals$ = this.localService.getAllLocalPaginated(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
      map(
        response => {
          if (response.code === HttpStatusCode.Ok){
            this.currentPageElementSize = response.result.size;
            this.numberOfElements = response.result.totalElements;
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

  showDetails(local: LocalModel) {
    this.router.navigate(['../local-detail', local.id], {relativeTo: this.route});
  }

  deleteLocal(local: LocalModel) {
    const dialogRef = this.dialog.open(DeleteLocalComponent, {
      data: local
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result){
          this.locals$.pipe(
            tap(list => {
              const index = list.data?.content.indexOf(local);
              list.data?.content.slice(index, 1);
            })
          );
        }
      }
    );
  }

  createLocal() {
    this.router.navigate(['../create-local'], {relativeTo: this.route});
  }

  pad(number : number){
    return String(number).padStart(3, '0');
  }
}
