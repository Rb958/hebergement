import {LocalModel} from "./local.model";

export class DepenseModel{
  public id: number;
  public demandeur: string;
  public local: LocalModel;
  public categorie: string;
  public type: string;
  public status: string;
  public srcDepense: string;
  public montant: number;
  public commentaire: string;
  public pieceJointe: string;
  public createdAt: Date;
  public lastUpdatedAt: Date

  constructor() {
    this.id = 0;
    this.demandeur = "";
    this.local = {} as LocalModel;
    this.categorie = "";
    this.type = "";
    this.status = "";
    this.srcDepense = "";
    this.montant = 0;
    this.commentaire = "";
    this.pieceJointe = "";
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
  }
}
