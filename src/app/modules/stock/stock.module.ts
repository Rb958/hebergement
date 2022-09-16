import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import {TranslateModule} from "@ngx-translate/core";
import { ListStockComponent } from './pages/list-stock/list-stock.component';
import { ListArticleComponent } from './pages/list-article/list-article.component';
import { ListCommandeComponent } from './pages/list-commande/list-commande.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import { NewArticleComponent } from './dialogs/new-article/new-article.component';
import { DeleteArticleComponent } from './dialogs/delete-article/delete-article.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewCommandeComponent } from './pages/new-commande/new-commande.component';
import { DeleteCommandeComponent } from './dialogs/delete-commande/delete-commande.component';
import {PsFormsModule} from "../../shared/components/ps-forms/ps-forms.module";


@NgModule({
  declarations: [
    ListStockComponent,
    ListArticleComponent,
    ListCommandeComponent,
    NewArticleComponent,
    DeleteArticleComponent,
    NewCommandeComponent,
    DeleteCommandeComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StockRoutingModule,
        MatDialogModule,
        TranslateModule,
        MatPaginatorModule,
        PsFormsModule
    ]
})
export class StockModule { }
