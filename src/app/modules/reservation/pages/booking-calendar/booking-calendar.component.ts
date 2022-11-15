import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {LocalModel} from "../../../../shared/models/entity/local.model";

interface SelectedItem {
  local: string,
  date: string,
  bookingNum: string,
}

@Component({
  selector: 'app-booking-calendar',
  templateUrl: './booking-calendar.component.html',
  styleUrls: ['./booking-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingCalendarComponent implements OnInit {

  @Input("currentMonth")
  currentMonth: number = 7;
  @Input("currentYear")
  currentYear: number = 2022;
  @Input("locals")
  locals: Array<LocalModel> = [];
  @Input("monthlyBooking")
  monthlyBooking: Array<any> = [];
  @Output("select")
  select: EventEmitter<SelectedItem> = new EventEmitter();

  days: Array<number> = [];
  currentMonthName: string = '';
  selectedBooking: any = {};

  i = 0;

  constructor() { }

  ngOnInit(): void {
    this.initView();
  }

  hasBooking(local: LocalModel, days: any): string {
    let styleClass = 'libre';
    if(local.status == 'HORS_SERVICE'){
      styleClass = 'maintenance';
    }
    if (local.bookings) {
      const date = this.currentYear + '-' + this.currentMonth + '-' +days;
      const bookings = local.bookings.filter(booking => {
        const start = booking.dateReservation.toString().split("T")[0];
        const end = booking.validite?.split("T")[0];
        if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) {
          return booking;
        } else {
          return null;
        }
      });
      if (bookings.length > 0) {
        switch (bookings[0].statut) {
          case 'CLOTURER':
            styleClass = 'clos';
            break;
          case 'ANNULE':
            styleClass = 'libre';
            break;
          case 'ATTENTE':
            styleClass = 'attente';
            break;
          case 'HORS_SERVICE':
            default:
            styleClass = 'maintenance';
            break;
          case 'CONFIRME':
            if (bookings[0].paymentStatus == 'PARTIELLE') {
              if(local.status == 'LIBRE'){
                styleClass = 'libre-partial';
              }
              if (local.status == 'OCCUPE') {
                styleClass = 'occupe-partial'
              }
            } else if (bookings[0].paymentStatus == 'PAYE') {
              if(local.status == 'LIBRE'){
                styleClass = 'libre-payer';
              }
              if(local.status == 'OCCUPE'){
                styleClass = 'occuper-payer';
              }
            }
            break;
        }
      }
    }
    return styleClass;
  }

  onAction(local: any, day: number) {
    const date = this.currentYear + '-' + this.currentMonth + '-' +day;

    const selection : SelectedItem = {
      local: local,
      date: date,
      bookingNum: ''
    };
    this.select.emit(selection);
  }

  private findBookingByLocalAndDate(LocalNum: any, date: any){

  }

  private initView() {
    const date = this.currentYear + '-' + this.currentMonth + '-01';
    this.currentMonthName = moment(date, 'YYYY-MM-DD', 'Fr').format('MMMM');
    const currentMonthDays = moment(date).daysInMonth();
    this.days = new Array<number>(currentMonthDays).fill(currentMonthDays, 0, currentMonthDays).map((x,i) => i + 1);
  }

  previousMonth() {
    this.currentMonth -= 1;
    if (this.currentMonth < 1){
      this.currentYear -= 1;
      this.currentMonth = 12;
    }
    const date = this.currentYear + '-' + this.currentMonth + '-01';
    this.currentMonthName = moment(date, 'YYYY-MM-DD', 'Fr').format('MMMM');
    this.initView();
  }

  nextMonth() {
    this.currentMonth += 1;
    if (this.currentMonth > 12){
      this.currentYear += 1;
      this.currentMonth = 1;
    }
    const date = this.currentYear + '-' + this.currentMonth + '-01';
    this.currentMonthName = moment(date, 'YYYY-MM-DD', 'Fr').format('MMMM');
    this.initView();
  }

  isToday(day: number, currentMonth: number) {
    const date = this.currentYear + '-' + currentMonth + '-' + day;
    const currentDate = moment(date, 'YYYY-MM-DD');
    const newDate = new Date();
    const nowDate = newDate.getFullYear() + '-' + ( newDate.getMonth() + 1) + '-' + newDate.getDate();
    const today = moment(nowDate, 'YYYY-MM-DD');
    return today.isSame(currentDate);
  }
}
