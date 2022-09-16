import {CommandeModel} from "./commande.model";
import {ArticleModel} from "./article.model";

export class LigneCommandeModel{
  public id: number;
  public article: ArticleModel;
  public commande: CommandeModel | null;
  public qte: number;
  public prixUnitaire: number;
  public qteStock: number;
  public createdAt: Date | null;
  public lastUpdatedAt: Date | null;

  constructor() {
    this.id = 0;
    this.commande = {} as CommandeModel;
    this.article = {} as ArticleModel;
    this.qte = 0;
    this.prixUnitaire = 0;
    this.qteStock = 0;
    this.createdAt = null;
    this.lastUpdatedAt = null;
  }
}
