import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BailRoutingModule } from './bail-routing.module';
import { ListBailPageComponent } from './pages/list-bail-page/list-bail-page.component';
import {TranslateModule} from "@ngx-translate/core";
import {NgChartsModule} from "ng2-charts";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewBailComponent } from './dialog/new-bail/new-bail.component';
import { LocalAvailableComponent } from './local-available/local-available.component';
import {ButtonLoaderModule} from "../../shared/components/button-loader/button-loader.module";


@NgModule({
  declarations: [
    ListBailPageComponent,
    NewBailComponent,
    LocalAvailableComponent
  ],
  imports: [
    CommonModule,
    BailRoutingModule,
    TranslateModule,
    NgChartsModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonLoaderModule
  ]
})
export class BailModule { }
