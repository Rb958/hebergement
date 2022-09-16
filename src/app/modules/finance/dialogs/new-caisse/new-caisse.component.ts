import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalModel} from "../../../../shared/models/entity/local.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {CaisseService} from "../../../../shared/services/services/caisse.service";
import {CaisseModel} from "../../../../shared/models/entity/caisse.model";
import {AppStore, LocalData} from "../../../../shared/utils/app-store";
import {UserModel} from "../../../../shared/models/entity/user.model";
import {UserService} from "../../../../shared/services/services/user.service";

@Component({
  selector: 'app-new-caisse',
  templateUrl: './new-caisse.component.html',
  styleUrls: ['./new-caisse.component.scss']
})
export class NewCaisseComponent implements OnInit {

  caisseForm: FormGroup = {} as FormGroup;
  isEdition: boolean;
  users: Array<UserModel> = [];
  localData: LocalData = {} as LocalData;
  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<NewCaisseComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private caisseService: CaisseService,
    private notifierService: NotifierService,
    private appStore: AppStore,
    private userService: UserService
  ) {
    this.isEdition = false;
  }

  ngOnInit(): void {
    this.isEdition = this.data.edition;
    this.localData = this.appStore.getData();
    this.loadUser();
    if (this.data.edition){
      this.initForm(this.data.caisse);
    }else{
      this.initForm();
    }
  }

  private initForm(caisse?: CaisseModel) {
    if (caisse) {
      this.caisseForm = this.fb.group({
        nom: [caisse?.nom, Validators.required],
        user: this.fb.group({
          id: [caisse?.user?.id, Validators.required]
        })
      });
    } else {
      this.caisseForm = this.fb.group({
        nom: ['', Validators.required],
        user: this.fb.group({
          id: ['', Validators.required]
        })
      });
    }
  }

  saveCaisse() {
    this.loading = true;
    if (this.caisseForm.valid) {
      if (!this.data.edition) {
        // const currentUser = Object.create(null);
        // currentUser.id = this.localData.userDetails?.userId;
        // this.caisseForm.value.user = currentUser;
        this.caisseService.create(this.caisseForm.value).subscribe(
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
        this.caisseService.updateCaisse(this.caisseForm.value, this.data.caisse.id).subscribe(
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
        'Formulaire invalide',
        'Nouvelle caisse',
        NotificationType.SUCCESS
      );
    }
  }

  private processSuccess(apiResponse: ApiResponseModel<any>) {
    if (apiResponse.code == 200) {
      this.notifierService.notify(
        'Caisse enregistré avec succès',
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

  private loadUser() {
    this.userService.getAllUser().subscribe(
      apiResponse => {
        if (apiResponse.code == 200) {
          this.users = apiResponse.result;
        } else {
          this.notifierService.notify(
            apiResponse.message,
            'Erreur',
            NotificationType.ERROR
          );
        }
      },
      error => {
        this.notifierService.notify(
          'Erreur de communication avec le serveur',
          'Erreur',
          NotificationType.ERROR
        );
      }
    );
  }
}
