import { CustomPipeModule } from './../../shared/custom-pipe/custom-pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalRoutingModule } from './local-routing.module';
import { LocalListComponent } from './pages/local-list/local-list.component';
import { NewLocalComponent } from './pages/new-local/new-local.component';
import { DeleteLocalComponent } from './dialogs/delete-local/delete-local.component';
import { EnableLocalComponent } from './enable-local/enable-local.component';
import { LocalDetailsComponent } from './pages/local-details/local-details.component';
import {TranslateModule} from "@ngx-translate/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgChartsModule} from "ng2-charts";
import {ButtonLoaderModule} from "../../shared/components/button-loader/button-loader.module";
import { EditLocalComponent } from './pages/edit-local/edit-local.component';
import { LocalHorsServiceComponent } from './pages/local-hors-service/local-hors-service.component';


@NgModule({
  declarations: [
    LocalListComponent,
    NewLocalComponent,
    DeleteLocalComponent,
    EnableLocalComponent,
    LocalDetailsComponent,
    EditLocalComponent,
    LocalHorsServiceComponent,
  ],
    imports: [
        CommonModule,
        CustomPipeModule,
        LocalRoutingModule,
        TranslateModule,
        FormsModule,
        NgChartsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatPaginatorModule,
        MatStepperModule,
        ButtonLoaderModule
    ]
})
export class LocalModule { }
