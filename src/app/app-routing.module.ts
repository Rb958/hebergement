import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./modules/common/not-found/not-found.component";
import {AuthGuard} from "./shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
  },
  {
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    path: 'parameters',
    loadChildren: () => import('./modules/parameters/parameters.module').then(m => m.ParametersModule)
  },
  {
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    path: 'local',
    loadChildren: () => import('./modules/local/local.module').then(m => m.LocalModule)
  },
  {
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    path: 'locataire',
    loadChildren: () => import('./modules/locataire/locataire.module').then(m => m.LocataireModule)
  },
  {
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    path: 'reservation',
    loadChildren: () => import('./modules/reservation/reservation.module').then(m => m.ReservationModule)
  },
  {
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    path: 'employe',
    loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
