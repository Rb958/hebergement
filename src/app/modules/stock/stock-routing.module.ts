import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListStockComponent} from "./pages/list-stock/list-stock.component";
import {ListArticleComponent} from "./pages/list-article/list-article.component";
import {ListCommandeComponent} from "./pages/list-commande/list-commande.component";
import {NewCommandeComponent} from "./pages/new-commande/new-commande.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-all',
    pathMatch: 'full'
  },
  {
    path: 'list-all',
    component: ListStockComponent
  },
  {
    path: 'article',
    component: ListArticleComponent
  },
  {
    path: 'commande',
    component: ListCommandeComponent
  },
  {
    path: 'new-commande',
    component: NewCommandeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
