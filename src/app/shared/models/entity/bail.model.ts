import {LocalModel} from "./local.model";
import {LocataieSociete, LocataireParticulierModel} from "./locataire.model";
import {PayementsModel} from "./payements.model";

export class BailModel{
  public id: number;
  public dateEntre: Date;
  public validite: string | null;
  public numReservation: string | null;
  public statut: string | null;
  public sejour: number;
  public preriodUnit: string | null;
  public paymentStatus: string | null;
  public createdAt: Date;
  public lastUpdatedAt: Date;
  public local: LocalModel;
  public locataireSociete: LocataieSociete | null;
  public locataireParticulier: LocataireParticulierModel | null;
  public payements: Array<PayementsModel>;

  constructor() {
    this.id = 0;
    this.dateEntre = new Date();
    this.validite = null;
    this.numReservation = null;
    this.statut = null;
    this.sejour = 0;
    this.preriodUnit = null;
    this.paymentStatus = null;
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
    this.local = {} as LocalModel;
    this.locataireSociete = null;
    this.locataireParticulier = null;
    this.payements = [];
  }
}
