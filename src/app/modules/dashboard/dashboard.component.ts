import { StatsService } from './../../shared/services/services/stats.service';
import { DataStateProcessing, DataStateEnum } from './../../shared/utils/data-processing-state';
import {Component, OnInit} from '@angular/core';
import {HttpStatusCode} from "@angular/common/http";
import {AppStore, LocalData} from "../../shared/utils/app-store";
import {CaisseService} from "../../shared/services/services/caisse.service";
import {catchError, map, Observable, of, startWith, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {NotifierService} from "../../shared/components/notification/notifier.service";
import {NotificationType} from "../../shared/components/notification/notification-type";
import {Chart, ChartConfiguration, ChartData, ChartType} from "chart.js";
// import {default as Annotation} from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  localData: LocalData = {} as LocalData;

  depenseMois = 500000;
  depenseAn = 12550000;


  // Line Chart
  lineChartType: ChartType = 'line';
  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 567, 983, 679, 690, 730, 660, 865 ],
        label: 'Chiffre d\'affaire (en millier)',
        backgroundColor: 'rgba(255,255,255,0)',
        borderColor: 'rgba(9,51,130,0.64)',
        pointBackgroundColor: 'rgba(9,51,130,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      }
    ],
    labels: [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4
      }
    },
    scales: {
      x: {},
      y: {
        min: 500
      }
    },
    plugins: {
      legend: { display: true },
    }
  }

  // Doughnut Chart

  public doughnutChartLabels: string[] = [ 'Appartement', 'Studio', 'Chambre' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 60, 15, 25 ] }
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';

  // Source d'information

  public siChartLabels: string[] = [ ];
  public siChartData: ChartData<'doughnut'> = {} as ChartData<'doughnut'>;

  statsDataState: Observable<DataStateProcessing<any>> = {} as Observable<DataStateProcessing<any>>;

  constructor(
    private appStore: AppStore,
    private router: Router,
    private statsService: StatsService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(){
    this.statsDataState = this.statsService.getStats().pipe(
      map(response => {
          if(response.code == HttpStatusCode.Ok.valueOf()){
            this.populateChart(response.result.evSa);
            this.populateDoughnut(response.result.sourceInfo);
            return {dataState: DataStateEnum.LOADED, message: response.message, data: response.result}
          }else {
            return {dataState: DataStateEnum.ERROR, message: response.message}
          }
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, message: err.message}))
    );
  }
  populateDoughnut(sourceInfo: any){
    const labels: Array<any> = [];
    const data: Array<any> = [];
    sourceInfo.forEach((item: any) => {
      data.push(item[0]);
      if (item[1] == null){
        labels.push('Autres');
      }else{
        labels.push(item[1]);
      }
    });
    this.siChartData.labels = labels;
    this.siChartData.datasets = [
        { data: data }
      ]
  }

  populateChart(evSa: any[]) {
    const newData = new Array<any>(12);
    evSa.forEach(item => {
      newData[parseInt(item[1])] = item[0];
    });
    this.lineChartData.datasets[0].data = newData;
  }
}
