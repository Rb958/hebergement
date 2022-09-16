import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {TransfertService} from "../../../../shared/services/services/transfert.service";
import {CaisseService} from "../../../../shared/services/services/caisse.service";
import {CaisseModel} from "../../../../shared/models/entity/caisse.model";
import {TransfertModel} from "../../../../shared/models/entity/transfert.model";

@Component({
  selector: 'app-new-transfert',
  templateUrl: './new-transfert.component.html',
  styleUrls: ['./new-transfert.component.scss']
})
export class NewTransfertComponent implements OnInit {

  transfertForm: FormGroup = {} as FormGroup;
  isEdition: boolean;
  caisses: Array<CaisseModel> = [];

  constructor(
    private dialogRef: MatDialogRef<NewTransfertComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private transfertService: TransfertService,
    private notifierService: NotifierService,
    private caisseService: CaisseService
  ) {
    this.isEdition = false;
  }

  ngOnInit(): void {
    this.isEdition = this.data.edition;
    this.loadLocals();
    if (this.data.edition){
      this.initForm(this.data.transfert);
    }else{
      this.initForm();
    }
  }

  private initForm(transfert?: TransfertModel) {
    if (transfert) {
      this.transfertForm = this.fb.group({
        transfertDe: this.fb.group({
          id: [transfert.transfertDe.id, Validators.required]
        }),
        transfertA: this.fb.group({
          id: [transfert.transfertA.id, Validators.required]
        }),
        montant: [transfert.montant, [Validators.required,Validators.pattern(/^[0-9]+$/)]]
      });
    } else {
      this.transfertForm = this.fb.group({
        transfertDe: this.fb.group({
          id: ['', Validators.required]
        }),
        transfertA: this.fb.group({
          id: ['', Validators.required]
        }),
        montant: [0, [Validators.required,Validators.pattern(/^[0-9]+$/)]]
      });
    }
  }

  saveTransfert() {
    if (this.transfertForm.valid) {
      if (!this.data.edition) {
        this.transfertService.create(this.transfertForm.value).subscribe(
          apiResponse => {
            this.processSuccess(apiResponse);
          },
          error => {
            this.processError(error);
          }
        );
      }else{
        this.transfertService.updateDepense(this.transfertForm.value, this.data.employee.id).subscribe(
          apiResponse => {
            this.processSuccess(apiResponse);
          },
          error => {
            this.processError(error);
          }
        );
      }
    }
  }

  private processSuccess(apiResponse: ApiResponseModel<any>) {
    if (apiResponse.code == 200) {
      this.notifierService.notify(
        'Transfert enregistré avec succès',
        'Succès',
        NotificationType.SUCCESS
      );
      this.dialogRef.close(apiResponse.result);
    } else {
      this.notifierService.notify(
        apiResponse.message,
        'Erreur',
        NotificationType.ERROR
      );
      this.dialogRef.close(false);
    }
  }

  private processError(error: any) {
    this.notifierService.notify(
      'Erreur de communication avec le serveur',
      'Erreur',
      NotificationType.ERROR
    );
    this.dialogRef.close(false);
  }

  private loadLocals() {
    this.caisseService.findAllCaisse().subscribe(
      apiResponse => {
        if (apiResponse.code == 200){
          this.caisses = apiResponse.result;
        }
      },
      error => {
        this.notifierService.notify(
          "Impossible de charger toutes les Caisses",
          'Erreur',
          NotificationType.ERROR
        );
        this.dialogRef.close(false);
      }
    );
  }

}
