import { ReservationDetailsComponent } from './pages/reservation-details/reservation-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReservationListComponent} from "./pages/reservation-list/reservation-list.component";
import {NewReservationComponent} from "./pages/new-reservation/new-reservation.component";
import {ReservationFormComponent} from "./pages/reservation-form/reservation-form.component";
import {CalendrierReservationComponent} from "./pages/calendrier-reservation/calendrier-reservation.component";

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
    path: 'calendrier',
    component: CalendrierReservationComponent
  },
  {
    path: 'reservation-form/:id',
    component: ReservationFormComponent
  },
  {
    path: 'details/:id',
    component: ReservationDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
