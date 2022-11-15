import { MatExpansionModule } from '@angular/material/expansion';
import { FileUploaderModule } from './../../shared/components/file-uploader/file-uploader.module';
import { CustomPipeModule } from './../../shared/custom-pipe/custom-pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { ListDepenseComponent } from './pages/list-depense/list-depense.component';
import {TranslateModule} from "@ngx-translate/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DeleteDepenseComponent } from './dialogs/delete-depense/delete-depense.component';
import { NewDepenseComponent } from './dialogs/new-depense/new-depense.component';
import {ListCaisseComponent} from "./pages/list-caisse/list-caisse.component";
import { NewCaisseComponent } from './dialogs/new-caisse/new-caisse.component';
import { DeleteCaisseComponent } from './dialogs/delete-caisse/delete-caisse.component';
import { ListTransfertComponent } from './pages/list-transfert/list-transfert.component';
import { NewTransfertComponent } from './dialogs/new-transfert/new-transfert.component';
import { DeleteTransfertComponent } from './dialogs/delete-transfert/delete-transfert.component';
import { OpenCaissePageComponent } from './pages/open-caisse-page/open-caisse-page.component';
import {ButtonLoaderModule} from "../../shared/components/button-loader/button-loader.module";
import { CaisseDetailsComponent } from './pages/caisse-details/caisse-details.component';
import { CaisseCloseComponent } from './pages/caisse-close/caisse-close.component';
import { DepenseDetailsComponent } from './pages/depense-details/depense-details.component';
import { DepensePaymentComponent } from './pages/depense-payment/depense-payment.component';
import { CaisseDetailsAdminComponent } from './pages/caisse-details-admin/caisse-details-admin.component';


@NgModule({
  declarations: [
    ListDepenseComponent,
    DeleteDepenseComponent,
    NewDepenseComponent,
    ListCaisseComponent,
    NewCaisseComponent,
    DeleteCaisseComponent,
    ListTransfertComponent,
    NewTransfertComponent,
    DeleteTransfertComponent,
    OpenCaissePageComponent,
    CaisseDetailsComponent,
    CaisseCloseComponent,
    DepenseDetailsComponent,
    DepensePaymentComponent,
    CaisseDetailsAdminComponent
  ],
    imports: [
        CommonModule,
        CustomPipeModule,
        FinanceRoutingModule,
        MatDialogModule,
        ButtonLoaderModule,
        MatExpansionModule,
        FormsModule,
        FileUploaderModule,
        ReactiveFormsModule,
        TranslateModule,
        MatPaginatorModule,
        ButtonLoaderModule
    ]
})
export class FinanceModule { }
