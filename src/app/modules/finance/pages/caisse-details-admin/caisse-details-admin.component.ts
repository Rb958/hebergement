import { Component, OnInit } from '@angular/core';
import {CaisseModel} from "../../../../shared/models/entity/caisse.model";
import {AppStore, LocalData} from "../../../../shared/utils/app-store";
import {Subscription} from "rxjs";
import {CaisseService} from "../../../../shared/services/services/caisse.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {MatDialog} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpStatusCode} from "@angular/common/http";
import {CaisseCloseComponent} from "../caisse-close/caisse-close.component";
import {Env} from "../../../../shared/utils/Env";

@Component({
  selector: 'app-caisse-details-admin',
  templateUrl: './caisse-details-admin.component.html',
  styleUrls: ['./caisse-details-admin.component.scss']
})
export class CaisseDetailsAdminComponent implements OnInit {

  currentCaisse: CaisseModel = {} as CaisseModel;
  localData: LocalData = {} as LocalData;

  closeDialogSubscription: Subscription = {} as Subscription;

  constructor(
    private caisseService: CaisseService,
    private appStore: AppStore,
    private notifierService: NotifierService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.localData = this.appStore.getData();
    const caisseId = this.route.snapshot.paramMap.get('caisseId');
    this.loadCaisse(caisseId);
  }

  loadCaisse(caisseId: any) {
    this.caisseService.findById(caisseId).subscribe(
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
    const server = Env.getEnv().server;
    return this.sanitizer.bypassSecurityTrustResourceUrl(server + 'api/caisse/export/journal/' + currentCaisse.id);
  }

  transfert(currentCaisse: CaisseModel){

  }

}
