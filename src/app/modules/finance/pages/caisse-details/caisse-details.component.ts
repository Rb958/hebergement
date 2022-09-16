import { Router } from '@angular/router';
import { NotificationType } from './../../../../shared/components/notification/notification-type';
import { Subscription } from 'rxjs';
import { CaisseCloseComponent } from './../caisse-close/caisse-close.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpStatusCode } from '@angular/common/http';
import { NotifierService } from './../../../../shared/components/notification/notifier.service';
import { AppStore, LocalData } from './../../../../shared/utils/app-store';
import { CaisseService } from './../../../../shared/services/services/caisse.service';
import { CaisseModel } from './../../../../shared/models/entity/caisse.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caisse-details',
  templateUrl: './caisse-details.component.html',
  styleUrls: ['./caisse-details.component.scss']
})
export class CaisseDetailsComponent implements OnInit {

  currentCaisse: CaisseModel = {} as CaisseModel;
  localData: LocalData = {} as LocalData;

  closeDialogSubscription: Subscription = {} as Subscription;

  constructor(
    private caisseService: CaisseService,
    private appStore: AppStore,
    private notifierService: NotifierService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.localData = this.appStore.getData();
    this.loadCaisse(this.localData.userDetails?.userId);
  }

  loadCaisse(userId: number | undefined) {
    this.caisseService.findCaisseByUserId(userId).subscribe(
      apiResponse => {
      if(apiResponse?.code == HttpStatusCode.Ok.valueOf()){
        this.currentCaisse = apiResponse.result;
      }
    })
  }

  closeCaisse(currentCaisse: CaisseModel){
    const dialogRef = this.dialog.open(CaisseCloseComponent, {
      width: '400px',
      data: currentCaisse
    });

    this.closeDialogSubscription = dialogRef.afterClosed().subscribe(
      apiResponse => {
        if (apiResponse){
          this.appStore.logout(this.localData);
          this.router.navigateByUrl('/');
        }
      }
    );
  }

  print(currentCaisse: CaisseModel){

  }

  transfert(currentCaisse: CaisseModel){

  }
}
