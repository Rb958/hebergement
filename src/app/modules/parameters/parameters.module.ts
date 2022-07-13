import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { NewParameterComponent } from './pages/dialogs/new-parameter/new-parameter.component';
import { ListParametersComponent } from './pages/list-parameters/list-parameters.component';
import {TranslateModule} from "@ngx-translate/core";
import {PsFormsModule} from "../../shared/components/ps-forms/ps-forms.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import { EditParameterComponent } from './pages/dialogs/edit-parameter/edit-parameter.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    NewParameterComponent,
    ListParametersComponent,
    EditParameterComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    TranslateModule,
    PsFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class ParametersModule { }
