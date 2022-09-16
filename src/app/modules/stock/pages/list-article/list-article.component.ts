import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {DataStateEnum, DataStateProcessing} from "../../../../shared/utils/data-processing-state";
import {PageModel} from "../../../../shared/models/page-model";
import {MatDialog} from "@angular/material/dialog";
import {HttpStatusCode} from "@angular/common/http";
import {ArticleService} from "../../../../shared/services/services/article.service";
import {ArticleModel} from "../../../../shared/models/entity/article.model";
import {NewArticleComponent} from "../../dialogs/new-article/new-article.component";
import {DeleteArticleComponent} from "../../dialogs/delete-article/delete-article.component";

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {

  currentPageElementSize = 32;
  currentPageIndex = 0;
  pagesElementSize = [32, 64, 128, 256];
  totalPage = 0;
  articles$: Observable<DataStateProcessing<PageModel<ArticleModel>>> = {} as Observable<DataStateProcessing<PageModel<ArticleModel>>>;

  constructor(
    private dialog: MatDialog,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  newArticle() {
    const dialogRef = this.dialog.open(NewArticleComponent,{
      width: '600px',
      data: {
        edition: false
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  updateArticle(article: ArticleModel){
    const dialogRef = this.dialog.open(NewArticleComponent,{
      width: '600px',
      data: {
        edition: true,
        article: article
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  deleteArticle(article: ArticleModel) {
    const dialogRef = this.dialog.open(DeleteArticleComponent,{
      width: '300px',
      data: article
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.loadData();
      }
    );
  }

  private loadData(queryParam?: any) {
    this.articles$ = this.articleService.getAllArticlePaginated(this.currentPageIndex, this.currentPageElementSize, queryParam).pipe(
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
