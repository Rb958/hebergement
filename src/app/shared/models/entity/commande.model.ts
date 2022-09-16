import {FournisseurEntrepriseModel} from "./fournisseur-entreprise.model";
import {FournisseurParticulierModel} from "./fournisseur-particulier.model";
import {LigneCommandeModel} from "./ligne-commande.model";

export class CommandeModel {
  public id: number;
  public refCmd: string | null;
  public demandeur: string;
  public statut: string | null;
  public createdAt: Date | null;
  public lastUpdatedAt: Date | null;
  public dateLivraison: Date;
  public fournisseurEntreprise: FournisseurEntrepriseModel | null;
  public fournisseurParticulier: FournisseurParticulierModel | null;
  public prixTotal: number;
  public ligneCommande: Array<LigneCommandeModel>;

  constructor() {
    this.id = 0;
    this.refCmd = null;
    this.demandeur = '';
    this.statut = null;
    this.createdAt = null;
    this.lastUpdatedAt = null;
    this.dateLivraison = new Date();
    this.fournisseurEntreprise = null;
    this.fournisseurParticulier = null;
    this.prixTotal = 0;
    this.ligneCommande = [];
  }
}
