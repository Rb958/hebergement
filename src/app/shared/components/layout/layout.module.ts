import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsToolbarComponent } from './ps-toolbar/ps-toolbar.component';
import { PsNavbarComponent } from './ps-navbar/ps-navbar.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    PsToolbarComponent,
    PsNavbarComponent
  ],
  exports: [
    PsNavbarComponent,
    PsToolbarComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        MatTooltipModule
    ]
})
export class LayoutModule { }
