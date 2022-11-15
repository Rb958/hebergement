import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmployeeService } from "../../../../shared/services/services/employee.service";
import { EmployeModel } from "../../../../shared/models/entity/employe.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NotifierService } from "../../../../shared/components/notification/notifier.service";
import { NotificationType } from "../../../../shared/components/notification/notification-type";
import { ApiResponseModel } from "../../../../shared/models/api-response.model";

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {

  employeeForm: FormGroup = {} as FormGroup;
  isEdition: boolean;

  loading: boolean = false;

  uploadSuccess: boolean = false;
  uploadError: boolean = false;
  uploadedFileLink: string | undefined;

  constructor(
    private dialogRef: MatDialogRef<NewEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private notifierService: NotifierService
  ) {
    this.isEdition = false;
  }

  ngOnInit(): void {
    this.isEdition = this.data.edition;
    if (this.data.edition) {
      this.initForm(this.data.employee);
    } else {
      this.initForm();
    }
  }

  private initForm(employee?: EmployeModel) {
    if (employee) {
      this.employeeForm = this.fb.group({
        nom: [employee.nom, Validators.required],
        prenom: [employee.prenom],
        telephone: [employee.telephone, Validators.required],
        fonction: [employee.fonction, Validators.required],
        salaireMois: [employee.salaireMois, Validators.required],
        cni: [employee.cni, Validators.required],
        pjCni: [employee.pjCni, Validators.required],
        stMarital: [employee.stMarital, Validators.required],
        persContact: [employee.persContact],
        telephonePers: [employee.telephonePers]
      });
    } else {
      this.employeeForm = this.fb.group({
        nom: ['', Validators.required],
        prenom: [''],
        telephone: ['', Validators.required],
        fonction: ['', Validators.required],
        salaireMois: ['', Validators.required],
        cni: ['', Validators.required],
        pjCni: [''],
        stMarital: ['', Validators.required],
        persContact: [''],
        telephonePers: ['']
      });
    }
  }

  processFinished(event: any) {
    this.uploadError = true;
    this.uploadedFileLink = event.ref;
  }

  handleError(event: any) {
    this.uploadError = true;
  }

  saveEmployee() {
    this.loading = true;
    this.employeeForm.value.pjCni = this.uploadedFileLink;
    if (this.employeeForm.valid) {
      if (!this.data.edition) {
        if (this.uploadedFileLink) {
          this.employeeService.create(this.employeeForm.value).subscribe(
            apiResponse => {
              this.loading = false;
              this.processSuccess(apiResponse);
            },
            error => {
              this.loading = false;
              this.processError(error);
            }
          );
        }else{
          this.loading = false;
          this.notifierService.notify(
            'Veuiller charger la preuve de votre CNI',
            'Formulaire invalide',
            NotificationType.WARNING
          );
        }
      } else {
        // this.employeeForm.value.id = this.data.employee.id;
        this.employeeService.updateEmployee(this.employeeForm.value, this.data.employee.id).subscribe(
          apiResponse => {
            this.loading = false;
            this.processSuccess(apiResponse);
          },
          error => {
            this.loading = false;
            this.processError(error);
          }
        );
      }
    }else{
      this.loading = false;
      this.notifierService.notify(
        'Veuiller verifier votre formulaire',
        'Formulaire invalide',
        NotificationType.WARNING
      );
    }
  }

  private processSuccess(apiResponse: ApiResponseModel<any>) {
    if (apiResponse.code == 200) {
      this.notifierService.notify(
        'Employé enregistré avec succès',
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
      'Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
      'Erreur',
      NotificationType.ERROR
    );
    this.dialogRef.close(false);
  }
}
