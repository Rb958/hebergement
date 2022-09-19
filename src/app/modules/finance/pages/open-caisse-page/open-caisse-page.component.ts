import { UserModel } from './../../../../shared/models/entity/user.model';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CaisseService} from "../../../../shared/services/services/caisse.service";
import {CaisseModel} from "../../../../shared/models/entity/caisse.model";
import {AppStore} from "../../../../shared/utils/app-store";
import {HttpStatusCode} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-open-caisse-page',
  templateUrl: './open-caisse-page.component.html',
  styleUrls: ['./open-caisse-page.component.scss']
})
export class OpenCaissePageComponent implements OnInit {
  caishierForm: FormGroup = {} as FormGroup;
  cashier: CaisseModel = {} as CaisseModel;
  requestSent = false;
  loading = false;
  canShow = true;
  constructor(
    private fb: FormBuilder,
    private cashierService: CaisseService,
    private appStore: AppStore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCaisse();
  }

  private async loadCaisse() {
    await this.cashierService.findCaisseByUserId(this.appStore.getData().userDetails?.userId).toPromise().then(
      apiResponse => {
        if (apiResponse?.code == HttpStatusCode.Ok.valueOf()){
          this.cashier = apiResponse?.result;
          if (this.cashier.status == 'ATTENTE' || this.cashier.status == 'ATTENTE_FERMETURE'){
            this.requestSent = true;
            this.canShow = false;
          }
          this.initForm(this.cashier);
        }
      }
    );
  }

  private initForm(caisse: CaisseModel) {
    const soldeOm = caisse.sousCaisses.find(sousCaise => sousCaise.name == 'Orange Money');
    const soldeMoMo = caisse.sousCaisses.find(sousCaise => sousCaise.name == 'MTN Mobile Money');
    const soldeCheque = caisse.sousCaisses.find(sousCaise => sousCaise.name == 'Chèque');
    const soldeCredit = caisse.sousCaisses.find(sousCaise => sousCaise.name == 'Crédit');
    const soldeEspece = caisse.sousCaisses.find(sousCaise => sousCaise.name == 'Espèces');
  
    this.caishierForm = this.fb.group({
      amount: [caisse.solde, Validators.required],
      om: [soldeOm?.total, Validators.required],
      momo: [soldeMoMo?.total, Validators.required],
      cheque: [soldeCheque?.total, Validators.required],
      credit: [soldeCredit?.total, Validators.required],
      espece: [soldeEspece?.total, Validators.required]
    });
  }

  OnOpenCashier(cashier: CaisseModel) {
    this.loading = true;
    cashier.solde = this.caishierForm.value.amount;
    cashier.sousCaisses.forEach(subCashier => {
      if(subCashier.name == 'Orange Money'){
        subCashier.soldeInit = this.caishierForm.value.om;
        subCashier.soldeFin = 0;
        subCashier.total = this.caishierForm.value.om;
      }
      if(subCashier.name == 'MTN Mobile Money'){
        subCashier.soldeInit = this.caishierForm.value.momo;
        subCashier.soldeFin = 0;
        subCashier.total = this.caishierForm.value.momo;
      }
      if(subCashier.name == 'Chèque'){
        subCashier.soldeInit = this.caishierForm.value.cheque;
        subCashier.soldeFin = 0;
        subCashier.total = this.caishierForm.value.cheque;
      }
      if(subCashier.name == 'Crédit'){
        subCashier.soldeInit = this.caishierForm.value.credit;
        subCashier.soldeFin = 0;
        subCashier.total = this.caishierForm.value.credit;
      }
      if(subCashier.name == 'Espèces'){
        subCashier.soldeInit = this.caishierForm.value.espece;
        subCashier.soldeFin = 0;
        subCashier.total = this.caishierForm.value.espece;
      }
      // subCashier.caisse = cashier;
    }); 
    cashier.transactionCaisses = [];
    // cashier.user = ;
    this.cashierService.openCaisse(cashier).subscribe(
      
      apiResponse => {
        if (apiResponse.code == HttpStatusCode.Ok.valueOf()){
          this.loading = false;
          this.requestSent = true;
          this.canShow = false
        }else{
          this.loading = false;
        }
      },
      error => {
        this.loading = false;
      }
    );
  }

  onLogout() {
    const localData = this.appStore.getData();
    localData.token = null;
    localData.userDetails = null;
    localData.sessionExists = false;
    localData.keepSessionAlive = false;
    this.appStore.logout(localData);
    this.router.navigateByUrl('/');
  }
}
