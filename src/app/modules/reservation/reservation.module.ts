import { MatExpansionModule } from '@angular/material/expansion';
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
import { NewPaymentsComponent } from './pages/new-payments/new-payments.component';
import { BookingCalendarComponent } from './pages/booking-calendar/booking-calendar.component';
import { CalendrierReservationComponent } from './pages/calendrier-reservation/calendrier-reservation.component';
import {ButtonLoaderModule} from "../../shared/components/button-loader/button-loader.module";
import { ReservationDetailsComponent } from './pages/reservation-details/reservation-details.component';
import { CustomPipeModule } from 'src/app/shared/custom-pipe/custom-pipe.module';
import { RembourseReservationComponent } from './pages/rembourse-reservation/rembourse-reservation.component';
import { OccuperReservationComponent } from './pages/occuper-reservation/occuper-reservation.component';
import { CloturerReservationComponent } from './pages/cloturer-reservation/cloturer-reservation.component';


@NgModule({
  declarations: [
    NewReservationComponent,
    ReservationListComponent,
    ReservationFormComponent,
    DeleteReservationComponent,
    NewPaymentsComponent,
    BookingCalendarComponent,
    CalendrierReservationComponent,
    ReservationDetailsComponent,
    RembourseReservationComponent,
    OccuperReservationComponent,
    CloturerReservationComponent
  ],
    imports: [
        CommonModule,
        ReservationRoutingModule,
        CustomPipeModule,
        TranslateModule,
        FormsModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatPaginatorModule,
        NgChartsModule,
        ButtonLoaderModule
    ]
})
export class ReservationModule { }
