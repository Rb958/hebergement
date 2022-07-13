import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RescueComponent } from './pages/rescue/rescue.component';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PsVersionComponent} from "../../shared/components/ps-common/ps-version/ps-version.component";
import {PsFormsModule} from "../../shared/components/ps-forms/ps-forms.module";


@NgModule({
    declarations: [
        LoginComponent,
        RescueComponent,
        PsVersionComponent
    ],
    exports: [
        PsVersionComponent
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        PsFormsModule
    ]
})
export class AccountModule { }
