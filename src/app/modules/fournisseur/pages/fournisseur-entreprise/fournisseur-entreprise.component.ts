import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {PageModel} from "../../../../shared/models/page-model";
import {MatDialog} from "@angular/material/dialog";
import {FournisseurService} from "../../../../shared/services/services/fournisseur.service";
import {HttpStatusCode} from "@angular/common/http";
import {FournisseurEntrepriseModel} from "../../../../shared/models/entity/fournisseur-entreprise.model";
import {DeleteFournisseurEntrepriseComponent} from "../../dialogs/delete-fournisseur-entreprise/delete-fournisseur-entreprise.component";
import {NewFournisseurEntrepriseComponent} from "../../dialogs/new-fournisseur-entreprise/new-fournisseur-entreprise.component";

@Component({
  selector: 'app-fournisseur-entreprise',
  templateUrl: './fournisseur-entreprise.component.html',
  styleUrls: ['./fournisseur-entreprise.component.scss']
})
export class FournisseurEntrepriseComponent implements OnInit {

  currentPageElementSize = 32;
  currentPageIndex = 0;
  pagesElementSize = [32, 64, 128, 256];
  totalPage = 0;
  fournisseurEntreprise$: Observable<DataStateProcessing<PageModel<FournisseurEntrepriseModel>>> = {} as Observable<DataStateProcessing<PageModel<FournisseurEntrepriseModel>>>;

  constructor(
    private dialog: MatDialog,
    private fournisseurService: FournisseurService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  newFournisseurEntrep() {
    const dialogRef = this.dialog.open(NewFournisseurEntrepriseComponent,{
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

  updateFournisseurEntrep(fournisseurEntrep: FournisseurEntrepriseModel){
    const dialogRef = this.dialog.open(NewFournisseurEntrepriseComponent,{
      width: '600px',
      data: {
        edition: true,
        fournisseurEntreprise: fournisseurEntrep
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  deleteFournisseurEntrep(fournisseurEntrep: FournisseurEntrepriseModel) {
    const dialogRef = this.dialog.open(DeleteFournisseurEntrepriseComponent,{
      width: '300px',
      data: fournisseurEntrep
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  private loadData(queryParam?: any) {
    this.fournisseurEntreprise$ = this.fournisseurService.getAllFournisseurEntrep(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
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
