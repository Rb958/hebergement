export class FournisseurParticulierModel{
  public id: number;
  public nom: string;
  public prenom: string;
  public localisation: string;
  public telephone: string;
  public caCumule: number;
  public echeance: string;
  public mail1: string;
  public mail2: string;
  public createdAt: Date;
  public lastUpdatedAt: Date;

  constructor() {
    this.id = 0;
    this.nom = '';
    this.prenom = '';
    this.localisation = '';
    this.telephone = '';
    this.caCumule = 0;
    this.echeance = '';
    this.mail1 = '';
    this.mail2 = '';
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
  }
}
