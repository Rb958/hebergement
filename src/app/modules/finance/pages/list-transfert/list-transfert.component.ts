import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {PageModel} from "../../../../shared/models/page-model";
import {MatDialog} from "@angular/material/dialog";
import {HttpStatusCode} from "@angular/common/http";
import {TransfertModel} from "../../../../shared/models/entity/transfert.model";
import {TransfertService} from "../../../../shared/services/services/transfert.service";
import {NewTransfertComponent} from "../../dialogs/new-transfert/new-transfert.component";
import {DeleteTransfertComponent} from "../../dialogs/delete-transfert/delete-transfert.component";

@Component({
  selector: 'app-list-transfert',
  templateUrl: './list-transfert.component.html',
  styleUrls: ['./list-transfert.component.scss']
})
export class ListTransfertComponent implements OnInit {

  currentPageElementSize = 32;
  currentPageIndex = 0;
  pagesElementSize = [32, 64, 128, 256];
  totalPage = 0;
  transfert$: Observable<DataStateProcessing<PageModel<TransfertModel>>> = {} as Observable<DataStateProcessing<PageModel<TransfertModel>>>;

  constructor(
    private dialog: MatDialog,
    private transfertService: TransfertService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  newTransfert() {
    const dialogRef = this.dialog.open(NewTransfertComponent,{
      width: '600px',
      data: {
        edition: false
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  updateTransfert(transfert: TransfertModel){
    const dialogRef = this.dialog.open(NewTransfertComponent,{
      width: '600px',
      data: {
        edition: true,
        transfert: transfert
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  deleteTransfert(transfert: TransfertModel) {
    const dialogRef = this.dialog.open(DeleteTransfertComponent,{
      width: '300px',
      data: transfert
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  private loadData(queryParam?: any) {
    this.transfert$ = this.transfertService.getAllCaissePaginated(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
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
}
