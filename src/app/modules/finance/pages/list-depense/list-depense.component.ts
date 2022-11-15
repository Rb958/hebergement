import { DepensePaymentComponent } from './../depense-payment/depense-payment.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AppStore, LocalData } from './../../../../shared/utils/app-store';
import {Component, OnInit} from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {PageModel} from "../../../../shared/models/page-model";
import {MatDialog} from "@angular/material/dialog";
import {HttpStatusCode} from "@angular/common/http";
import {DepenseModel} from "../../../../shared/models/entity/depense.model";
import {DepenseService} from "../../../../shared/services/services/depense.service";
import {NewDepenseComponent} from "../../dialogs/new-depense/new-depense.component";
import {DeleteDepenseComponent} from "../../dialogs/delete-depense/delete-depense.component";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {NotificationType} from "../../../../shared/components/notification/notification-type";

@Component({
  selector: 'app-list-depense',
  templateUrl: './list-depense.component.html',
  styleUrls: ['./list-depense.component.scss']
})
export class ListDepenseComponent implements OnInit {

  currentPageElementSize = 32;
  currentPageIndex = 0;
  pagesElementSize = [32, 64, 128, 256];
  totalPage = 0;
  depense$: Observable<DataStateProcessing<PageModel<DepenseModel>>> = {} as Observable<DataStateProcessing<PageModel<DepenseModel>>>;
  localData: LocalData = {} as LocalData;
  constructor(
    private dialog: MatDialog,
    private depenseService: DepenseService,
    private notifierService: NotifierService,
    private appStore: AppStore,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.localData = this.appStore.getData();
    this.loadData();
  }

  newDepense() {
    const dialogRef = this.dialog.open(NewDepenseComponent,{
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

  showDetails(depense: DepenseModel){
    this.router.navigate(['../details', depense.id], {relativeTo: this.route});
  }

  updateDepense(depense: DepenseModel){
    const dialogRef = this.dialog.open(NewDepenseComponent,{
      width: '600px',
      data: {
        edition: true,
        depense: depense
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  deleteDepense(depense: DepenseModel) {
    const dialogRef = this.dialog.open(DeleteDepenseComponent,{
      width: '300px',
      data: depense
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  private loadData(queryParam?: any) {
    this.depense$ = this.depenseService.getAllDepensePaginated(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
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

  validateDepense(depense: DepenseModel) {
    this.depenseService.validate(depense, this.localData.userDetails?.userId).subscribe(
      apiResponse => {
        if (apiResponse.code == 200){
          this.notifierService.notify(
            apiResponse.message,
            'Succès',
            NotificationType.SUCCESS
          );
          this.loadData();
        }else{
          this.notifierService.notify(
            apiResponse.message,
            'Erreur',
            NotificationType.ERROR
          );
        }
      },
      error => {
        this.notifierService.notify(
          "Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique",
          'Erreur',
          NotificationType.ERROR
        );
      }
    );
  }

  getStatusStyle(depenseStatus: string | undefined){
    if(depenseStatus){
      switch (depenseStatus) {
        case 'VALIDE':
          return 'chip-success';
        case 'CLOTURE':
          return 'chip-danger'
        case 'REFUSE':
          return 'chip-blue';
        default :
          return 'chip-warning'
      }
    }else{
      return 'chip-warning';
    }
  }

  cloturerDepense(depense: DepenseModel) {
    this.depenseService.cloturer(depense).subscribe(
      apiResponse => {
        if (apiResponse.code == 200){
          this.notifierService.notify(
            apiResponse.message,
            'Succès',
            NotificationType.SUCCESS
          );
          this.loadData();
        }else{
          this.notifierService.notify(
            apiResponse.message,
            'Erreur',
            NotificationType.ERROR
          );
        }
      },
      error => {
        this.notifierService.notify(
          "Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique",
          'Erreur',
          NotificationType.ERROR
        );
      }
    );
  }
}
