import { Component, OnInit } from '@angular/core';
import {LocataieSociete} from "../../../../shared/models/entity/locataire.model";
import {catchError, map, Observable, of, startWith, tap} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {PageModel} from "../../../../shared/models/page-model";
import {MatDialog} from "@angular/material/dialog";
import {LocataireService} from "../../../../shared/services/services/locataire.service";
import {HttpStatusCode} from "@angular/common/http";
import {NewLocataireComponent} from "../../dialog/new-locataire/new-locataire.component";
import {DeleteLocataireComponent} from "../../dialog/delete-locataire/delete-locataire.component";

@Component({
  selector: 'app-list-locataire',
  templateUrl: './list-locataire.component.html',
  styleUrls: ['./list-locataire.component.scss']
})
export class ListLocataireComponent implements OnInit {

  searchValue = '';

  currentPageElementSize = 32;
  currentPageIndex = 0;
  pagesElementSize = [32, 64, 128, 256];
  totalPage = 0;

  locataireSociete$: Observable<DataStateProcessing<PageModel<LocataieSociete>>> = {} as Observable<DataStateProcessing<PageModel<LocataieSociete>>>;

  constructor(
    private dialog: MatDialog,
    private locataireService: LocataireService
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  update(locataire: LocataieSociete) {
    const dialogRef = this.dialog.open(NewLocataireComponent, {
      width: '600px',
      data : {
        edition: true,
        locataire: locataire
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.locataireSociete$.pipe(
          tap(list => {
            const index = list.data?.content.indexOf(locataire);
            if (index!= undefined && index >= 0){
              list.data?.content.slice(index,1);
              list.data?.content.push(result);
            }
          })
        );
      }
    });
  }

  delete(locataire: LocataieSociete) {
    const dialogRef = this.dialog.open(DeleteLocataireComponent, {
      width: '600px',
      data : {
        edition: true,
        locataire: locataire
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.locataireSociete$.pipe(
          tap(list => {
            const index = list.data?.content.indexOf(locataire);
            if (index!= undefined && index >= 0){
              list.data?.content.slice(index,1);
            }
          })
        );
      }
    });
  }

  newLocataire() {
    const dialogRef = this.dialog.open(NewLocataireComponent, {
      width: '600px',
      data : {
        edition: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.locataireSociete$.pipe(
          tap(list => {
              list.data?.content.push(result);
          })
        );
      }
    });
  }

  private loadData(queryParam?: any){
    this.locataireSociete$ = this.locataireService.getAllLocataireSocietePagined(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
      map(
        response => {
          if (response.code === HttpStatusCode.Ok){
            this.totalPage = response.result.totalPage;
            this.currentPageElementSize = response.result.totalElements;
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
