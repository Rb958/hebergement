import { DepenseDetailsComponent } from './pages/depense-details/depense-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListDepenseComponent} from "./pages/list-depense/list-depense.component";
import {ListCaisseComponent} from "./pages/list-caisse/list-caisse.component";
import {ListTransfertComponent} from "./pages/list-transfert/list-transfert.component";
import {OpenCaissePageComponent} from "./pages/open-caisse-page/open-caisse-page.component";
import {CaisseDetailsAdminComponent} from "./pages/caisse-details-admin/caisse-details-admin.component";

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
    path: 'caisse/details/:caisseId',
    component: CaisseDetailsAdminComponent
  },
  {
    path: 'depense/details/:id',
    component: DepenseDetailsComponent
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
