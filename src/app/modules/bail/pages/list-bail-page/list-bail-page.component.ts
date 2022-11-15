import { NotificationType } from 'src/app/shared/components/notification/notification-type';
import { UserDetails } from './../../../../shared/utils/app-store';
import { LocalData, AppStore } from 'src/app/shared/utils/app-store';
import { RembourseBailComponent } from './../../dialog/rembourse-bail/rembourse-bail.component';
import { CancelBailComponent } from './../../dialog/cancel-bail/cancel-bail.component';
import { EditBailComponent } from './../../dialog/edit-bail/edit-bail.component';
import { NewBailComponent } from './../../dialog/new-bail/new-bail.component';
import { Env } from './../../../../shared/utils/Env';
import { DomSanitizer } from '@angular/platform-browser';
import { BailPaymentDialogComponent } from './../../dialog/bail-payment-dialog/bail-payment-dialog.component';
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
import * as moment from 'moment';

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
  localData: LocalData | undefined;
  // Chart
  public doughnutChartLabels: string[] = [ 'Annulés', 'Confirmé', 'Cloturé' ];
  public doughnutChartData: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bailService: BailService,
    private dialog: MatDialog,
    private notifierService: NotifierService,
    private sanitize: DomSanitizer,
    private appStore: AppStore
  ) {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: []
    };
  }

  ngOnInit(): void {
    this.localData = this.appStore.getData();
    this.loadData();
    this.getStats();
  }

  newBail() {
    this.router.navigate(['../local-available'], {relativeTo: this.route});
  }

  showBail(bail: BailModel) {
    this.router.navigate(['../details', bail.id], {relativeTo: this.route});
  }

  notEnd(bail: BailModel){
    return moment(bail.validite).isAfter(moment(new Date()));
  }

  cancelBail(bail: BailModel) {
    let dialogRef;
    if (bail.statut == 'CONFIRME' && this.notEnd(bail)) {
      if (this.localData?.userDetails?.role == 'ROLEADMIN') {
        dialogRef = this.dialog.open(RembourseBailComponent, {
          width: '700px',
          data: bail
        });
      }else{
        this.notifierService.notify(
          "Vous n'êtes pas autorisé à effectuer: Seule un administrateur peut traiter ce cas",
          "Annulation d'une reservation",
          NotificationType.ERROR
        );
        return ;
      }
    }else{
      dialogRef = this.dialog.open(CancelBailComponent,{
        width: '400px',
        data: bail
      });
    }

    dialogRef.afterClosed().subscribe(
      result => {
        if (result){
          this.loadData();
        }
      }
    );
  }

  newPayment(bail: BailModel) {
    const dialogRef = this.dialog.open(BailPaymentDialogComponent,{
      width: '700px',
      data: bail
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result){
          this.loadData();
        }
      }
    );
  }

  updateBail(bail: BailModel) {
    const dialogRef = this.dialog.open(EditBailComponent,{
      width: '1000px',
      data: bail
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.router.navigateByUrl('/bails/list-all');
      }
    );
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

  getPaymentStyle(depenseStatus?: string | null){
    if(depenseStatus){
      switch (depenseStatus) {
        case 'PAYE':
          return 'chip-success';
        case 'IMPAYE':
          return 'chip-danger'
        case 'REMBOURSÉ':
          return 'chip-blue';
        default :
          return 'chip-warning'
      }
    }else{
      return 'chip-warning';
    }
  }

  getStatusStyle(depenseStatus?: string | null){
    if(depenseStatus){
      switch (depenseStatus) {
        case 'CONFIRME':
          return 'chip-success';
        case 'ANNULE':
          return 'chip-danger'
        case 'REMBOURSE':
          return 'chip-blue';
        default :
          return 'chip-warning'
      }
    }else{
      return 'chip-warning';
    }
  }

  getDownloadLink(bail: BailModel){
    const server = Env.getEnv().server;
    return this.sanitize.bypassSecurityTrustResourceUrl(server + "api/bail/receipt/"+bail.id);
  }
}
