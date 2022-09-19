import { BailDetailsPageComponent } from './pages/bail-details-page/bail-details-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListBailPageComponent} from "./pages/list-bail-page/list-bail-page.component";
import {LocalAvailableComponent} from "./local-available/local-available.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-all',
    pathMatch: 'full'
  },
  {
    path: 'list-all',
    component: ListBailPageComponent
  },
  {
    path: 'local-available',
    component: LocalAvailableComponent
  },
  {
    path: 'details/:id',
    component: BailDetailsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BailRoutingModule { }
