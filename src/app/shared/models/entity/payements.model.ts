import {ReservationModel} from "./reservation.model";
import {BailModel} from "./bail.model";
import {DepenseModel} from "./depense.model";

export class PayementsModel{
  public id: number;
  public createdAt: Date;
  public lastUpdatedAt: Date;
  public amount: number;
  public status: string;
  public isLast: boolean;
  public rest: number;
  public discount: number;
  public paymentMethod: string;
  public booking: ReservationModel | null;
  public bail: BailModel | null;
  public depense: DepenseModel | null;
  public validatedBy?: String;

  constructor() {
    this.id = 0;
    this.status = 'PENDING';
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
    this.discount = 0;
    this.amount = 0;
    this.paymentMethod = '';
    this.isLast = false;
    this.rest = 0;
    this.booking = null;
    this.depense = null;
    this.bail = null;
  }
}
