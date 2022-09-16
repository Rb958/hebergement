import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FournisseurParticulierComponent } from './pages/fournisseur-particulier/fournisseur-particulier.component';
import { FournisseurEntrepriseComponent } from './pages/fournisseur-entreprise/fournisseur-entreprise.component';
import { NewFournisseurPartculierComponent } from './dialogs/new-fournisseur-partculier/new-fournisseur-partculier.component';
import { NewFournisseurEntrepriseComponent } from './dialogs/new-fournisseur-entreprise/new-fournisseur-entreprise.component';
import { DeleteFournisseurParticulierComponent } from './dialogs/delete-fournisseur-particulier/delete-fournisseur-particulier.component';
import { DeleteFournisseurEntrepriseComponent } from './dialogs/delete-fournisseur-entreprise/delete-fournisseur-entreprise.component';
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FournisseurRoutingModule} from "./fournisseur-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    FournisseurParticulierComponent,
    FournisseurEntrepriseComponent,
    NewFournisseurPartculierComponent,
    NewFournisseurEntrepriseComponent,
    DeleteFournisseurParticulierComponent,
    DeleteFournisseurEntrepriseComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    FournisseurRoutingModule
  ]
})
export class FournisseurModule { }
