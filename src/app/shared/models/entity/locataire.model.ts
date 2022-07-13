export class LocataireModel{
  public id: number;
  public createdAt: Date;
  public lastUpdatedAt: Date;

  constructor() {
    this.id = 0;
    this.createdAt = new Date;
    this.lastUpdatedAt = new Date();
  }
}


export class LocataireParticulierModel extends LocataireModel{
  public nom: string;
  public prenom: string;
  public telephone: string;
  public lieuTravail: string;
  public cni: string;
  public pjCni: string;
  public stMaritale: string;
  public persContact: string;
  public persTelephone: string;
  public pjContrat: string;

  constructor() {
    super();
    this.nom = '';
    this.prenom = '';
    this.telephone = '';
    this.lieuTravail = '';
    this.cni = '';
    this.pjCni = '';
    this.stMaritale = '';
    this.persContact = '';
    this.persTelephone = '';
    this.pjContrat = '';
  }
}

export class LocataieSociete extends LocataireModel{
  public raisonSociale: string;
  public niu: string;
  public nomGerant: string;
  public profession: string;
  public persContact1: string;
  public persTelephone1: string;
  public persEmail1: string;
  public persContacter2: string;
  public persTelephone2: string;
  public persEmail2: string;

  constructor() {
    super();
    this.raisonSociale = '';
    this.niu = '';
    this.nomGerant = '';
    this.profession = '';
    this.persContact1 = '';
    this.persTelephone1 = '';
    this.persEmail1 = '';
    this.persContacter2 = '';
    this.persTelephone2 = '';
    this.persEmail2 = '';
  }
}
