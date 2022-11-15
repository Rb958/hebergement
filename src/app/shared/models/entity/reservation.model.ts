import {LocalModel} from "./local.model";
import {LocataieSociete, LocataireParticulierModel} from "./locataire.model";
import {PayementsModel} from "./payements.model";

export class ReservationModel{
  public id: number;
  public dateReservation: Date;
  public ref: string | null;
  public nom: string | null;
  public prenom: string | null;
  public telephone: string | null;
  public validite: string | null;
  public numReservation: string | null;
  public statut: string | null;
  public sourceInfo: string | null;
  public sejour: number;
  public paidAmount: number;
  public totalAmount: number;
  public restAmount: number;
  public preriodUnit: string | null;
  public paymentStatus: string | null;
  public createdAt: Date;
  public lastUpdatedAt: Date;
  public local: LocalModel;
  public indiceEntre: any;
  public indiceSortie: any;
  public moyenneConso: any;
  public locataireSociete: LocataieSociete | null;
  public locataireParticulier: LocataireParticulierModel | null;
  public payements: Array<PayementsModel>;

  constructor() {
    this.id = 0;
    this.dateReservation = new Date();
    this.nom = null;
    this.prenom = null;
    this.ref = null;
    this.telephone = null;
    this.validite = null;
    this.numReservation = null;
    this.sourceInfo = null;
    this.statut = null;
    this.sejour = 0;
    this.paidAmount = 0;
    this.restAmount = 0;
    this.totalAmount = 0;
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















