export class ArticleModel{
  public id: number;
  public designation: string;
  public createdAt: Date;
  public lastUpdatedAt: Date;

  constructor() {
    this.id = 0;
    this.designation = '';
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
  }
}
