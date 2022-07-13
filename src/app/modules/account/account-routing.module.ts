import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RescueComponent} from "./pages/rescue/rescue.component";
import {LoginGuard} from "../../shared/guards/login.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    canActivate: [LoginGuard],
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'rescue',
    component: RescueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
