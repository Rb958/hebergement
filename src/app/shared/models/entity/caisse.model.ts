import { SousCaisseModel } from './sous-caisse.model';
import {UserModel} from "./user.model";

export class CaisseModel{
  public id: number;
  public nom: string;
  public ref: string;
  public status: string;
  public solde: number;
  public lastClosing: Date | null;
  public lastOpening: Date | null;
  public sousCaisses: Array<SousCaisseModel>;
  public transactionCaisses: Array<any>;
  public user: UserModel | undefined | null;
  public createdAt: Date;
  public lastUpdatedAt: Date;
  constructor() {
    this.id = 0;
    this.nom = '';
    this.ref = '';
    this.status = '';
    this.solde = 0;
    this.lastClosing = null;
    this.sousCaisses = [];
    this.lastOpening = null;
    this.transactionCaisses = [];
    this.user = {} as UserModel;
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
  }
}
