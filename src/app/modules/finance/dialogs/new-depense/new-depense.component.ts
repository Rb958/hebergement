import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../../../../shared/services/services/employee.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {EmployeModel} from "../../../../shared/models/entity/employe.model";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {DepenseService} from "../../../../shared/services/services/depense.service";
import {DepenseModel} from "../../../../shared/models/entity/depense.model";
import {LocalModel} from "../../../../shared/models/entity/local.model";
import {LocalService} from "../../../../shared/services/services/local.service";

@Component({
  selector: 'app-new-depense',
  templateUrl: './new-depense.component.html',
  styleUrls: ['./new-depense.component.scss']
})
export class NewDepenseComponent implements OnInit {

  depenseForm: FormGroup = {} as FormGroup;
  isEdition: boolean;
  locals: Array<LocalModel> = [];

  constructor(
    private dialogRef: MatDialogRef<NewDepenseComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private depenseService: DepenseService,
    private notifierService: NotifierService,
    private localService: LocalService
  ) {
    this.isEdition = false;
  }

  ngOnInit(): void {
    this.isEdition = this.data.edition;
    this.loadLocals();
    if (this.data.edition){
      this.initForm(this.data.depense);
    }else{
      this.initForm();
    }
  }

  private initForm(depense?: DepenseModel) {
    if (depense) {
      this.depenseForm = this.fb.group({
        demandeur: [depense?.demandeur, Validators.required],
        type: [depense?.type, Validators.required],
        local: this.fb.group({
          id: [depense?.local?.id]
        }),
        categorie: [depense?.categorie, Validators.required],
        montant: [depense?.montant, Validators.required],
        commentaire: [depense?.commentaire, Validators.required],
        pieceJointe: [depense?.pieceJointe, Validators.required]
      });
    } else {
      this.depenseForm = this.fb.group({
        demandeur: ['', Validators.required],
        type: ['', Validators.required],
        local: this.fb.group({
          id: ['', Validators.required]
        }),
        categorie: ['', Validators.required],
        montant: ['', Validators.required],
        commentaire: [''],
        pieceJointe: ['', Validators.required]
      });
    }
  }

  saveDepense() {
    if (this.depenseForm.valid) {
      if (!this.data.edition) {
        this.depenseService.create(this.depenseForm.value).subscribe(
          apiResponse => {
            this.processSuccess(apiResponse);
          },
          error => {
            this.processError(error);
          }
        );
      }else{
        // this.employeeForm.value.id = this.data.employee.id;
        this.depenseService.updateDepense(this.depenseForm.value, this.data.employee.id).subscribe(
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
        'Dépense enregistré avec succès',
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
    this.localService.findAllLocals().subscribe(
      apiResponse => {
        if (apiResponse.code == 200){
          this.locals = apiResponse.result;
        }
      },
      error => {
        this.notifierService.notify(
          "Impossible de charger tous les locaux",
          'Erreur',
          NotificationType.ERROR
        );
        this.dialogRef.close(false);
      }
    );
  }
}
