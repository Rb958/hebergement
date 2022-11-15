export class ClientModel{
  public id: number | null;
  public clientName: string | null;
  public rccm: string | null;
  public phone: string | null;
  public email: string | null;
  public header: string | null;
  public footer: string | null;
  public createdAt: Date | null;
  public lastUpdatedAt: Date | null;

  constructor(){
    this.id = null;
    this.clientName = null;
    this.rccm = null;
    this.phone = null;
    this.email = null;
    this.header = null;
    this.footer = null;
    this.createdAt = null;
    this.lastUpdatedAt = null;
  }
}
