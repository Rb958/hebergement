import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ListEmployeComponent } from './pages/list-employe/list-employe.component';
import { NewEmployeeComponent } from './dialog/new-employee/new-employee.component';
import {TranslateModule} from "@ngx-translate/core";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    ListEmployeComponent,
    NewEmployeeComponent
  ],
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        TranslateModule,
        MatPaginatorModule
    ]
})
export class EmployeeModule { }
