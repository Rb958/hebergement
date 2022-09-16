import {CaisseModel} from "./caisse.model";

export class TransfertModel{
  public id: number;
  public transactionRef: string;
  public transfertDe: CaisseModel;
  public transfertA: CaisseModel;
  public montant: number;
  public statut: string;
  public createdAt: Date;
  public lastUpdatedAt: Date;

  constructor() {
    this.id = 0;
    this.transactionRef = '';
    this.transfertDe = {} as CaisseModel;
    this.transfertA = {} as CaisseModel;
    this.montant = 0;
    this.statut = '';
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
  }
}
