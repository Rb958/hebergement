import {ArticleModel} from "./article.model";

export class StockModel{
  public id: number;
  public article: ArticleModel;
  public qte: number;
  public createdAt: Date;
  public lastUpdatedAt: Date;

  constructor() {
    this.id = 0;
    this.article = {} as ArticleModel;
    this.qte = 0;
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
  }
}
