import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListLocataireComponent} from "./pages/list-locataire/list-locataire.component";
import {ListLocataireParticulierComponent} from "./pages/list-locataire-particulier/list-locataire-particulier.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'particulier/list-all',
    pathMatch: 'full'
  },
  {
    path: 'societe/list-all',
    component: ListLocataireComponent
  },
  {
    path: 'particulier/list-all',
    component: ListLocataireParticulierComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocataireRoutingModule { }
