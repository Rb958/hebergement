import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FournisseurParticulierComponent} from "./pages/fournisseur-particulier/fournisseur-particulier.component";
import {FournisseurEntrepriseComponent} from "./pages/fournisseur-entreprise/fournisseur-entreprise.component";

const routes: Routes = [
  {
    path: 'particulier',
    redirectTo: 'particulier/list-all',
    pathMatch: 'full'
  },
  {
    path: 'entreprise',
    redirectTo: 'entreprise/list-all',
    pathMatch: 'full'
  },
  {
    path: 'particulier/list-all',
    component: FournisseurParticulierComponent
  },
  {
    path: 'entreprise/list-all',
    component: FournisseurEntrepriseComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseurRoutingModule{}
