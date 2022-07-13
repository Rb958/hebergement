import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { NewReservationComponent } from './pages/new-reservation/new-reservation.component';
import { ReservationListComponent } from './pages/reservation-list/reservation-list.component';
import {TranslateModule} from "@ngx-translate/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ReservationFormComponent } from './pages/reservation-form/reservation-form.component';
import { DeleteReservationComponent } from './delete-reservation/delete-reservation.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    NewReservationComponent,
    ReservationListComponent,
    ReservationFormComponent,
    DeleteReservationComponent
  ],
    imports: [
        CommonModule,
        ReservationRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatPaginatorModule,
        NgChartsModule
    ]
})
export class ReservationModule { }
