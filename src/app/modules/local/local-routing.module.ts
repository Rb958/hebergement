import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LocalListComponent} from "./pages/local-list/local-list.component";
import {NewLocalComponent} from "./pages/new-local/new-local.component";
import {LocalDetailsComponent} from "./pages/local-details/local-details.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-all',
    pathMatch: 'full'
  },
  {
    path: 'list-all',
    component: LocalListComponent
  },
  {
    path: 'create-local',
    component: NewLocalComponent
  },
  {
    path: 'local-detail/:id',
    component: LocalDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalRoutingModule { }
