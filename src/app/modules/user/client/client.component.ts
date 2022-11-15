import { Validators } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { ClientModel } from './../../../shared/models/entity/client.model';
import { ClientService } from './../../../shared/services/services/client.service';
import { NotifierService } from './../../../shared/components/notification/notifier.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/shared/components/notification/notification-type';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  clientForm: FormGroup = {} as FormGroup;

  currentClient: ClientModel | null = null;

  headeruploadSuccess: boolean = false;
  uploadedheaderLink: any = null;
  headeruploadError: boolean = false;

  footeruploadSuccess: boolean = false;
  uploadedfooterLink: any = null;
  footeruploadError: boolean = false;

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private notifier: NotifierService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.clientService.getClientBy().subscribe(
      apiResponse => {
        if(apiResponse.code == HttpStatusCode.Ok.valueOf()){
          if (apiResponse.result.length > 0){
            this.currentClient = apiResponse.result[0];
          }else{
            this.currentClient = null;
          }
          this.initForm(this.currentClient);
        }
      }
    );
  }

  initForm(client: ClientModel | null){
    if(client){
      this.clientForm = this.fb.group({
        clientName: [client.clientName, Validators.required],
        rccm: [client.rccm, Validators.required],
        phone: [client.phone, Validators.required],
        email: [client.email, Validators.required],
        // header: [client.header, Validators.required],
        // footer: [client.footer, Validators.required],
      });
    }else{
      this.clientForm = this.fb.group({
        clientName: ['', Validators.required],
        rccm: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
        // header: ['', Validators.required],
        // footer: ['', Validators.required],
      });
    }
  }

  processFinished(event: any) {
    this.headeruploadSuccess = true;
    this.uploadedheaderLink = event.ref;
  }

  handleError(event: any) {
    this.headeruploadError = true;
  }

  processFooterFinished(event: any){
    this.footeruploadSuccess = true;
    this.uploadedfooterLink = event.ref;
  }

  handleFooterError(event: any){
    this.footeruploadError = true
  }

  submitForm(){
    this.loading = true;
    this.clientForm.value.header = this.uploadedheaderLink;
    this.clientForm.value.footer = this.uploadedfooterLink;
    if(this.clientForm.valid && this.uploadedheaderLink != null && this.uploadedfooterLink != null){
      if(this.currentClient){
        this.clientService.update(this.clientForm.value, this.currentClient?.id).subscribe(
          apiResponse => {
            if (apiResponse.code == 200){
              this.notifier.notify(
                'information cree avec succes',
                'parametres',
                NotificationType.SUCCESS
              );
              this.loading = false;
            }else{
              this.loading = false;
              this.notifier.notify(
                'Erreur lors de la mise a jour des informations. Veuiller rééssayer',
                'Enregistrement d\'un bail',
                NotificationType.ERROR
              );
            }
          },
          error => {
            this.loading = false;
            this.notifier.notify(
              'Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
              'Enregistrement d\'un bail',
              NotificationType.ERROR
            );
          }
        );
      }else{
        this.clientService.create(this.clientForm.value).subscribe(
          apiResponse => {
            if (apiResponse.code == 200){
              this.notifier.notify(
                'information mise a jour avec succes',
                'parametres',
                NotificationType.SUCCESS
              );
              this.loading = false;
            }else{
              this.loading = false;
              this.notifier.notify(
                'Erreur lors de la mise a jour des informations. Veuiller rééssayer',
                'Enregistrement d\'un bail',
                NotificationType.ERROR
              );
            }
          },
          error => {
            this.loading = false;
            this.notifier.notify(
              'Erreur lors du traitement de la requete. Veuillez reesayer et si le probleme persite contacter l\'equipe technique',
              'Enregistrement d\'un bail',
              NotificationType.ERROR
            );
          }
        );
      }
    }else{
      this.loading = false;
      this.notifier.notify(
        'Veuiller renseigner tous les champs obligatoire',
        'Formulaire invalide',
        NotificationType.WARNING
      );
    }
  }
}
