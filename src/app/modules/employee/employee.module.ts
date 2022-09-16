import { ButtonLoaderModule } from './../../shared/components/button-loader/button-loader.module';
import { FileUploaderModule } from './../../shared/components/file-uploader/file-uploader.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ListEmployeComponent } from './pages/list-employe/list-employe.component';
import { NewEmployeeComponent } from './dialog/new-employee/new-employee.component';
import {TranslateModule} from "@ngx-translate/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DeleteEmployeeComponent } from './dialog/delete-employee/delete-employee.component';
import { ListCaisseComponent } from '../finance/pages/list-caisse/list-caisse.component';


@NgModule({
  declarations: [
    ListEmployeComponent,
    NewEmployeeComponent,
    DeleteEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,
    FileUploaderModule,
    ButtonLoaderModule
  ]
})
export class EmployeeModule { }
