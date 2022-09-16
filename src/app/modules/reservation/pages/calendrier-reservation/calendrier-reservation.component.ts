import { Component, OnInit } from '@angular/core';
import {LocalModel} from "../../../../shared/models/entity/local.model";
import {ReservationModel} from "../../../../shared/models/entity/reservation.model";
import {LocalService} from "../../../../shared/services/services/local.service";
import * as moment from "moment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-calendrier-reservation',
  templateUrl: './calendrier-reservation.component.html',
  styleUrls: ['./calendrier-reservation.component.scss']
})
export class CalendrierReservationComponent implements OnInit {
  locals: Array<LocalModel> = [];
  monthlyBookings: Array<ReservationModel> = [];
  currentYear = moment().year();
  currentMonth = moment().month() + 1;
  constructor(
    private localService: LocalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadLocals();
  }

  onSelectDate(data: any) {
    console.dir(data);
  }

  private loadLocals() {
    this.localService.findAllLocals().subscribe(
      apiResponse => {
        if (apiResponse.code == 200){
          this.locals = apiResponse.result;
          console.dir(this.locals);
        }
      }
    );
  }

  newReservation() {
    this.router.navigate(['../local-available'], {relativeTo: this.route});
  }
}
