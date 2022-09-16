import {Component, OnInit} from '@angular/core';
import {LocalModel} from "../../../../shared/models/entity/local.model";
import {LocalService} from "../../../../shared/services/services/local.service";
import {HttpStatusCode} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ReservationFormComponent} from "../reservation-form/reservation-form.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReservationService} from "../../../../shared/services/services/reservation.service";
import {ReservationModel} from "../../../../shared/models/entity/reservation.model";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {NotificationType} from "../../../../shared/components/notification/notification-type";

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.scss']
})
export class NewReservationComponent implements OnInit {
  currentPageIndex = 0;
  currentPageElementSize = 32;
  pagesElementSize = [32, 64, 128, 256];
  locals: Array<LocalModel> = [];
  hasResult = false;
  bookingSearchForm: FormGroup = {} as FormGroup;
  loadingSearch = false;

  constructor(
    private localSevice: LocalService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private localService: LocalService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    // this.findAvailableLocal();
    this.initSearchForm();
  }

  selectLocal(local: LocalModel) {
    const dialog = this.dialog.open(ReservationFormComponent, {
      width: '1000px',
      data: {
        local,
        startDate: this.bookingSearchForm.value.startDate,
        endDate: this.bookingSearchForm.value.endDate
      }
    });
  }

  private initSearchForm() {
    this.bookingSearchForm = this.fb.group({
      startDate: [null,Validators.required],
      endDate: [null,Validators.required],
      typeLocal: ['', Validators.required]
    });
  }

  onSearch() {
    this.loadingSearch = true;
    if (this.bookingSearchForm.valid){
      this.localService.findBooking(this.bookingSearchForm.value).subscribe(
        apiResponse => {
          if (apiResponse.code == HttpStatusCode.Ok.valueOf()){
            this.loadingSearch = false;
            this.hasResult = true;
            this.locals = apiResponse.result;
          }else{
            this.loadingSearch = false;
            this.notifier.notify(
              'Une erreur lors de la recuperation des logements',
              'Recherche des logements',
              NotificationType.ERROR
            );
          }
        },
        error => {
          this.loadingSearch = false;
          this.notifier.notify(
            'Une erreur lors de la recuperation des logements',
            'Recherche des logements',
            NotificationType.ERROR
          );
        }
      );
    }else{
      this.loadingSearch = false;
          this.notifier.notify(
            'Veuiller remplir correctement le formulaire',
            'Formulaire invalide',
            NotificationType.WARNING
          );
    }
  }
}
