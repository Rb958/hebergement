import {Component, OnInit} from '@angular/core';
import {HttpStatusCode} from "@angular/common/http";
import {AppStore, LocalData} from "../../shared/utils/app-store";
import {CaisseService} from "../../shared/services/services/caisse.service";
import {Subscription} from "rxjs";
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

  constructor(
    private appStore: AppStore,
    private router: Router,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    console.dir(this.appStore.getData());
  }
}
