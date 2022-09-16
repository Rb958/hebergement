import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {PageModel} from "../../../../shared/models/page-model";
import {ArticleModel} from "../../../../shared/models/entity/article.model";
import {MatDialog} from "@angular/material/dialog";
import {DeleteArticleComponent} from "../../dialogs/delete-article/delete-article.component";
import {HttpStatusCode} from "@angular/common/http";
import {CommandeModel} from "../../../../shared/models/entity/commande.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CommandeService} from "../../../../shared/services/services/commandeService";

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.scss']
})
export class ListCommandeComponent implements OnInit {

  currentPageElementSize = 32;
  currentPageIndex = 0;
  pagesElementSize = [32, 64, 128, 256];
  totalPage = 0;
  commandes$: Observable<DataStateProcessing<PageModel<CommandeModel>>> = {} as Observable<DataStateProcessing<PageModel<CommandeModel>>>;

  constructor(
    private dialog: MatDialog,
    private commandeService: CommandeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  newCommande() {
    this.router.navigate(['../new-commande'], {relativeTo: this.activatedRoute});
  }

  updateCommande(commande: CommandeModel){
    this.router.navigate(['../new-commande', { id: commande.id }], {relativeTo: this.activatedRoute});
  }

  deleteCommande(commande: CommandeModel) {
    const dialogRef = this.dialog.open(DeleteArticleComponent,{
      width: '300px',
      data: commande
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  private loadData(queryParam?: any) {
    this.commandes$ = this.commandeService.getAllCommandePaginated(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
      map(
        response => {
          if (response.code === HttpStatusCode.Ok){
            return {dataState: DataStateEnum.LOADED, message: response.message, data: response.result}
          }else {
            return {dataState: DataStateEnum.ERROR, message: response.message}
          }
        }
      ),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, message: err.error.error}))
    );
  }
}
