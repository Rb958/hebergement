import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {PageModel} from "../../../../shared/models/page-model";
import {MatDialog} from "@angular/material/dialog";
import {HttpStatusCode} from "@angular/common/http";
import {FournisseurParticulierModel} from "../../../../shared/models/entity/fournisseur-particulier.model";
import {FournisseurService} from "../../../../shared/services/services/fournisseur.service";
import {NewFournisseurPartculierComponent} from "../../dialogs/new-fournisseur-partculier/new-fournisseur-partculier.component";
import {DeleteFournisseurParticulierComponent} from "../../dialogs/delete-fournisseur-particulier/delete-fournisseur-particulier.component";

@Component({
  selector: 'app-fournisseur-particulier',
  templateUrl: './fournisseur-particulier.component.html',
  styleUrls: ['./fournisseur-particulier.component.scss']
})
export class FournisseurParticulierComponent implements OnInit {

  currentPageElementSize = 32;
  currentPageIndex = 0;
  pagesElementSize = [32, 64, 128, 256];
  totalPage = 0;
  fournisseursParticuliers$: Observable<DataStateProcessing<PageModel<FournisseurParticulierModel>>> = {} as Observable<DataStateProcessing<PageModel<FournisseurParticulierModel>>>;

  constructor(
    private dialog: MatDialog,
    private fournisseurService: FournisseurService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  newFournisseurPart() {
    const dialogRef = this.dialog.open(NewFournisseurPartculierComponent,{
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

  updateFournisseurPart(fournisseurParticulier: FournisseurParticulierModel){
    const dialogRef = this.dialog.open(NewFournisseurPartculierComponent,{
      width: '600px',
      data: {
        edition: true,
        fournisseurParticulier: fournisseurParticulier
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  deleteFournisseurPart(fournisseurParticulier: FournisseurParticulierModel) {
    const dialogRef = this.dialog.open(DeleteFournisseurParticulierComponent,{
      width: '300px',
      data: fournisseurParticulier
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  private loadData(queryParam?: any) {
    this.fournisseursParticuliers$ = this.fournisseurService.getAllFournisseurPart(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
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
