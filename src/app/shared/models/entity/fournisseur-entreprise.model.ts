export class FournisseurEntrepriseModel{
  public id: number;
  public logo: string;
  public raisonSociale: string;
  public niu: string;
  public rccm: string;
  public poste: string;
  public telephone: string;
  public caCumule: number;
  public echeance: string;
  public mail1: string;
  public mail2: string;
  public createdAt: Date;
  public lastUpdatedAt: Date;

  constructor() {
    this.id = 0;
    this.logo = '';
    this.raisonSociale = '';
    this.niu = '';
    this.rccm = '';
    this.poste = '';
    this.telephone = '';
    this.caCumule = 0;
    this.echeance = '';
    this.mail1 = '';
    this.mail2 = '';
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
  }
}
