export class EmployeModel{
  public nom: string;
  public prenom: string;
  public telephone: string;
  public fonction: string;
  public salaire: number;
  public cni: string;
  public pjCni: string;
  public SM: string;
  public persContact: string;
  public telephonePers: string;
  public createdAt: Date;
  public lastUpdatedAt: Date;


  constructor() {
    this.nom = '';
    this.telephone = '';
    this.prenom = '';
    this.fonction = '';
    this.salaire = 0;
    this.cni = '';
    this.pjCni = '';
    this.SM = '';
    this.persContact = '';
    this.telephonePers = '';
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
  }
}
