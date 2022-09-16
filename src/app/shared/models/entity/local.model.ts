import {ReservationModel} from "./reservation.model";

export class LocalModel {
  public id : number;
  public ville : string | null;
  public pays : string | null;
  public quartier : string | null;
  public immeuble : string | null;
  public typeLocal : string | null;
  public nomLocal : string | null;
  public numeroLocal : string | null;
  public etage : string | null;
  public localisation : string | null;
  public categorie : string | null;
  public fumeur : boolean;
  public clim : boolean;
  public piscine : boolean;
  public wifi : boolean;
  public animaux : boolean;
  public chauffage : boolean;
  public parkingIn : boolean;
  public gadienJour : boolean;
  public gardientNuit : boolean;
  public groupeElect : boolean;
  public nbrChambre : number;
  public nbrDouche : number;
  public prix : number;
  public typePrix : string | null;
  public contrat : string | null;
  public status: string | null;
  public bookings: Array<ReservationModel>;
  public immobilisations: Array<any>;

  constructor() {
    this.id = 0;
    this.ville = null;
    this.pays = null;
    this.quartier = null;
    this.immeuble = null;
    this.typeLocal = null;
    this.nomLocal = null;
    this.numeroLocal = null;
    this.etage = null;
    this.localisation = null;
    this.categorie = null;
    this.fumeur = false;
    this.clim = false;
    this.piscine = false;
    this.wifi = false;
    this.animaux = false;
    this.chauffage = false;
    this.parkingIn = false;
    this.gadienJour = false;
    this.gardientNuit = false;
    this.groupeElect = false;
    this.nbrChambre = 0;
    this.nbrDouche = 0;
    this.prix = 0;
    this.typePrix = null;
    this.contrat = null;
    this.status = null;
    this.bookings = [];
    this.immobilisations = [];
  }
}
