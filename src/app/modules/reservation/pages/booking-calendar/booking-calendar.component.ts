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

  constructor() { }

  ngOnInit(): void {
    this.initView();
  }

  hasBooking(local: LocalModel, days: any): string {
    if (local.bookings.length) {
      const date = this.currentYear + '-' + this.currentMonth + '-' +days;
      // console.log('Is Valid : ' + moment(date).isBetween('2022-7-20', '2022-7-29'));
      const bookings = local.bookings.filter(booking => {
        const start = booking.dateReservation.toString().split("T")[0]; //booking.dateReservation.getFullYear() + '-' + booking.dateReservation.getMonth() + '-' + booking.dateReservation.getDate();
        const end = booking.validite?.split("T")[0]; //booking.dateFin.getFullYear() + '-' + booking.dateFin.getMonth() + '-' + booking.dateFin.getDate();
        if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) {
          return booking;
        } else {
          return null;
        }
      });
      if (bookings.length > 0) {
        // console.log('Status: ' + bookings[0].statut);
        switch (bookings[0].statut) {
          case 'CLOTURER':
            return 'clos';
          case 'ANNULE':
            return 'annuler';
          case 'EN_MAINTENANCE':
            return 'maintenance';
          case 'CONFIRME':
            if (bookings[0].paymentStatus == 'PARTIELLE') {
              return 'occuper-impayer';
            } else if (bookings[0].paymentStatus == 'PAYE') {
              return 'occuper-payer'
            }
        }
      }
    }
    return 'libre';
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
    if (this.currentMonth % 2 != 0 || this.currentMonth == 8){
      this.days = new Array<number>(31).fill(31,0,31).map((x,i) => i + 1);
    }else {
      if (this.currentMonth == 2){
        if (this.currentYear % 4 == 0){
          this.days = new Array<number>(29).fill(29,0,29).map((x,i) => i + 1);
        }else{
          this.days = new Array<number>(28).fill(28,0,28).map((x,i) => i + 1);
        }
      }else{
        this.days = new Array<number>(30).fill(30,0,30).map((x,i) => i + 1);
      }
    }
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
