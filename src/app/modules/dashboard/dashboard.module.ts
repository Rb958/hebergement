import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {CounterWidgetModule} from "../../shared/components/counter-widget/counter-widget.module";
import {NgChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CounterWidgetModule,
    NgChartsModule
  ]
})
export class DashboardModule { }
