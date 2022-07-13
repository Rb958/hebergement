import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListEmployeComponent} from "./pages/list-employe/list-employe.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-all',
    pathMatch: 'full'
  },
  {
    path: 'list-all',
    component: ListEmployeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
