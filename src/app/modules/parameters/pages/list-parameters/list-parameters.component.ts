import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditParameterComponent} from "../dialogs/edit-parameter/edit-parameter.component";
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {ParameterModel} from "../../../../shared/models/entity/parameter.model";
import {PageModel} from "../../../../shared/models/page-model";
import {ParameterService} from "../../../../shared/services/services/parameter.service";
import {HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-list-parameters',
  templateUrl: './list-parameters.component.html',
  styleUrls: ['./list-parameters.component.scss']
})
export class ListParametersComponent implements OnInit, OnDestroy {

  searchValue = '';

  currentPageElementSize = 32;
  currentPageIndex = 1;
  pagesElementSize = [32, 64, 128, 256];
  totalPage = 0;

  parameters$ : Observable<DataStateProcessing<PageModel<ParameterModel>>> = {} as Observable<DataStateProcessing<PageModel<ParameterModel>>>;

  constructor(
    private dialog: MatDialog,
    private parameterService: ParameterService
  ) { }

  ngOnDestroy(): void {
    // this.parameters$.;
  }

  ngOnInit(): void {
    this.loadParameters();
  }

  onSearch(searchItem: any): void {

  }

  onOpenDialogNew(): void {
    const dialogRef = this.dialog.open(EditParameterComponent, {
      width: '600px',
      data: {
        edition: false,
        parameter: null
      }
    });
  }

  private loadParameters(queryParam?:any):void {
    this.parameters$ = this.parameterService.getAllPagined(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
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

  reloadData(): void{
    const queryParam = Object.create(null);
    queryParam.pageSize = this.currentPageElementSize;
    queryParam.pageIndex = this.currentPageIndex;
    if (this.searchValue.trim().length != 0){
      queryParam.filter = this.searchValue;
    }
    this.loadParameters(queryParam);
  }

  onEditParameter(parameter: ParameterModel): void {
    const dialogRef = this.dialog.open(EditParameterComponent, {
      width: '600px',
      data: {
        edition: false,
        parameter: null
      }
    });
  }

  deleteParameter(parameter: ParameterModel) {
    const dialogRef = this.dialog.open(EditParameterComponent, {
      width: '600px',
      data: {
        edition: false,
        parameter: null
      }
    });
  }
}
