import { PayementsModel } from './payements.model';
import { FournisseurEntrepriseModel } from "./fournisseur-entreprise.model";
import { FournisseurParticulierModel } from "./fournisseur-particulier.model";
import {LocalModel} from "./local.model";

export class DepenseModel{
  public id: number;
  public demandeur: string;
  public local: LocalModel;
  public categorie: string;
  public type: string;
  public status: string;
  public srcDepense: string;
  public validatedBy: String;
  public montant: number;
  public paidAmount: number;
  public totalAmount: number;
  public restAmount: number;
  public paymentStatus: string;
  public commentaire: string;
  public pieceJointe: string;
  public createdAt: Date;
  public lastUpdatedAt: Date
  public fournisseurEntreprise: FournisseurEntrepriseModel | null;
  public fournisseurParticulier: FournisseurParticulierModel | null;
  public payments: Array<PayementsModel> = [];

  constructor() {
    this.id = 0;
    this.demandeur = "";
    this.local = {} as LocalModel;
    this.categorie = "";
    this.validatedBy = '';
    this.type = "";
    this.status = "";
    this.srcDepense = "";
    this.montant = 0;
    this.commentaire = "";
    this.pieceJointe = "";
    this.paymentStatus = '';
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
    this.fournisseurEntreprise = null;
    this.fournisseurParticulier = null;
    this.paidAmount = 0;
    this.totalAmount = 0;
    this.restAmount = 0;
  }
}
