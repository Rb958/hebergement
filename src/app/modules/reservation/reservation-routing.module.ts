import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReservationListComponent} from "./pages/reservation-list/reservation-list.component";
import {NewReservationComponent} from "./pages/new-reservation/new-reservation.component";
import {ReservationFormComponent} from "./pages/reservation-form/reservation-form.component";

const routes: Routes = [
  {
    path : '',
    redirectTo : 'reservation-list',
    pathMatch : 'full'
  },
  {
    path: 'reservation-list',
    component: ReservationListComponent
  },
  {
    path: 'local-available',
    component: NewReservationComponent
  },
  {
    path: 'reservation-form/:id',
    component: ReservationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
