import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListParametersComponent} from "./pages/list-parameters/list-parameters.component";

const routes: Routes = [
  {
    path: '',
    component: ListParametersComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
