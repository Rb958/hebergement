import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocataireRoutingModule } from './locataire-routing.module';
import { ListLocataireComponent } from './pages/list-locataire/list-locataire.component';
import { NewLocataireComponent } from './dialog/new-locataire/new-locataire.component';
import {TranslateModule} from "@ngx-translate/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import { DeleteLocataireComponent } from './dialog/delete-locataire/delete-locataire.component';
import { ListLocataireParticulierComponent } from './pages/list-locataire-particulier/list-locataire-particulier.component';
import { EditLocataireParticulierComponent } from './dialog/edit-locataire-particulier/edit-locataire-particulier.component';
import { DeleteLocataireParticulierComponent } from './dialog/delete-locataire-particulier/delete-locataire-particulier.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListLocataireComponent,
    NewLocataireComponent,
    DeleteLocataireComponent,
    ListLocataireParticulierComponent,
    EditLocataireParticulierComponent,
    DeleteLocataireParticulierComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LocataireRoutingModule,
    TranslateModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class LocataireModule { }
