import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {PageModel} from "../../../../shared/models/page-model";
import {MatDialog} from "@angular/material/dialog";
import {HttpStatusCode} from "@angular/common/http";
import {CaisseModel} from "../../../../shared/models/entity/caisse.model";
import {CaisseService} from "../../../../shared/services/services/caisse.service";
import {DeleteCaisseComponent} from "../../dialogs/delete-caisse/delete-caisse.component";
import {NewCaisseComponent} from "../../dialogs/new-caisse/new-caisse.component";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {AppStore, LocalData} from "../../../../shared/utils/app-store";

@Component({
  selector: 'app-list-caisse',
  templateUrl: './list-caisse.component.html',
  styleUrls: ['./list-caisse.component.scss']
})
export class ListCaisseComponent implements OnInit {

  currentPageElementSize = 32;
  currentPageIndex = 0;
  pagesElementSize = [32, 64, 128, 256];
  totalPage = 0;
  caisse$: Observable<DataStateProcessing<PageModel<CaisseModel>>> = {} as Observable<DataStateProcessing<PageModel<CaisseModel>>>;

  isAdmin: boolean | undefined = false;

  localData : LocalData = {} as LocalData;

  constructor(
    private dialog: MatDialog,
    private caisseService: CaisseService,
    private notifierService: NotifierService,
    private appStore: AppStore
  ) { }

  ngOnInit(): void {
    this.localData = this.appStore.getData();
    this.isAdmin = this.localData.userDetails?.role?.includes("ROLEADMIN");
    this.loadData();
  }

  newCaisse() {
    const dialogRef = this.dialog.open(NewCaisseComponent,{
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

  updateCaisse(caisse: CaisseModel){
    const dialogRef = this.dialog.open(NewCaisseComponent,{
      width: '600px',
      data: {
        edition: true,
        caisse: caisse
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  deleteCaisse(caisse: CaisseModel) {
    const dialogRef = this.dialog.open(DeleteCaisseComponent,{
      width: '300px',
      data: caisse
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  private loadData(queryParam?: any) {
    this.caisse$ = this.caisseService.getAllCaissePaginated(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
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

  validate(caisse: CaisseModel) {
    this.caisseService.validate(caisse).subscribe(
      apiResponse => {
        if (apiResponse.code == 200) {
          this.notifierService.notify(
            "Valid?? avec succ??s",
            'Succ??s',
            NotificationType.SUCCESS
          );
        } else {
          this.notifierService.notify(
            apiResponse.message,
            'Erreur',
            NotificationType.ERROR
          );
        }
      },
      error => {
        this.notifierService.notify(
          'Erreur de communication avec le serveur',
          'Erreur',
          NotificationType.ERROR
        );
      }
    );
  }
}
