import { PsCommonModule } from './../../shared/components/ps-common/ps-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RescueComponent } from './pages/rescue/rescue.component';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PsFormsModule} from "../../shared/components/ps-forms/ps-forms.module";
import {ButtonLoaderModule} from "../../shared/components/button-loader/button-loader.module";


@NgModule({
    declarations: [
        LoginComponent,
        RescueComponent
    ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    PsFormsModule,
    ButtonLoaderModule,
    PsCommonModule
  ]
})
export class AccountModule { }
