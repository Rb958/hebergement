export class EmployeModel{
  public id: number;
  public nom: string;
  public prenom: string;
  public telephone: string;
  public fonction: string;
  public salaireMois: number;
  public cni: string;
  public pjCni: string;
  public stMarital: string;
  public persContact: string;
  public telephonePers: string;
  public createdAt: Date;
  public lastUpdatedAt: Date;


  constructor() {
    this.id = 0;
    this.nom = '';
    this.telephone = '';
    this.prenom = '';
    this.fonction = '';
    this.salaireMois = 0;
    this.cni = '';
    this.pjCni = '';
    this.stMarital = '';
    this.persContact = '';
    this.telephonePers = '';
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
  }
}
