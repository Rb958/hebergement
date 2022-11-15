import { FileUploaderModule } from './../../shared/components/file-uploader/file-uploader.module';
import { CustomPipeModule } from 'src/app/shared/custom-pipe/custom-pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BailRoutingModule } from './bail-routing.module';
import { ListBailPageComponent } from './pages/list-bail-page/list-bail-page.component';
import {TranslateModule} from "@ngx-translate/core";
import {NgChartsModule} from "ng2-charts";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewBailComponent } from './dialog/new-bail/new-bail.component';
import { LocalAvailableComponent } from './local-available/local-available.component';
import {ButtonLoaderModule} from "../../shared/components/button-loader/button-loader.module";
import { BailDetailsPageComponent } from './pages/bail-details-page/bail-details-page.component';
import { BailPaymentDialogComponent } from './dialog/bail-payment-dialog/bail-payment-dialog.component';
import { EditBailComponent } from './dialog/edit-bail/edit-bail.component';
import { CancelBailComponent } from './dialog/cancel-bail/cancel-bail.component';
import { RembourseBailComponent } from './dialog/rembourse-bail/rembourse-bail.component';
import { ChangeLocalComponent } from './dialog/change-local/change-local.component';
import { OccuperLocalDialogComponent } from './dialog/occuper-local-dialog/occuper-local-dialog.component';
import { CloturerBailComponent } from './dialog/cloturer-bail/cloturer-bail.component';


@NgModule({
  declarations: [
    ListBailPageComponent,
    NewBailComponent,
    LocalAvailableComponent,
    BailDetailsPageComponent,
    BailPaymentDialogComponent,
    EditBailComponent,
    CancelBailComponent,
    RembourseBailComponent,
    ChangeLocalComponent,
    OccuperLocalDialogComponent,
    CloturerBailComponent
  ],
  imports: [
    CommonModule,
    BailRoutingModule,
    MatExpansionModule,
    TranslateModule,
    NgChartsModule,
    FileUploaderModule,
    MatPaginatorModule,
    MatDialogModule,
    CustomPipeModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonLoaderModule
  ]
})
export class BailModule { }
