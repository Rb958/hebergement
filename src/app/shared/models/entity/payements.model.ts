import {ReservationModel} from "./reservation.model";

export class PayementsModel{
  public id: number;
  public createdAt: Date;
  public lastUpdatedAt: Date;
  public amount: number;
  public isLast: boolean;
  public rest: number;
  public discount: number;
  public paymentMethod: string;
  public booking: ReservationModel;

  constructor() {
    this.id = 0;
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
    this.discount = 0;
    this.amount = 0;
    this.paymentMethod = '';
    this.isLast = false;
    this.rest = 0;
    this.booking = {} as ReservationModel;
  }
}
