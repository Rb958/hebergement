import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListDepenseComponent} from "./pages/list-depense/list-depense.component";
import {ListCaisseComponent} from "./pages/list-caisse/list-caisse.component";
import {ListTransfertComponent} from "./pages/list-transfert/list-transfert.component";
import {OpenCaissePageComponent} from "./pages/open-caisse-page/open-caisse-page.component";

const routes: Routes = [
  {
    path: 'depense',
    redirectTo: 'depense/list-all',
    pathMatch: 'full'
  },
  {
    path: 'caisse',
    redirectTo: 'caisse/list-all',
    pathMatch: 'full'
  },
  {
    path: 'caisse/open',
    component: OpenCaissePageComponent
  },
  {
    path: 'transfert-caisse',
    redirectTo: 'transfert-caisse/list-all',
    pathMatch: 'full'
  },
  {
    path: 'depense/list-all',
    component: ListDepenseComponent
  },
  {
    path: 'caisse/list-all',
    component: ListCaisseComponent
  },
  {
    path: 'transfert-caisse/list-all',
    component: ListTransfertComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
