import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {LocalService} from "../../../../shared/services/services/local.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-local',
  templateUrl: './new-local.component.html',
  styleUrls: ['./new-local.component.scss']
})
export class NewLocalComponent implements OnInit {
  onglet1Form: UntypedFormGroup = {} as UntypedFormGroup;
  onglet2Form: UntypedFormGroup = {} as UntypedFormGroup;
  onglet3Form: UntypedFormGroup = {} as UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private notifier: NotifierService,
    private localService: LocalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms() {
    this.onglet1Form = this.fb.group({
      ville: ['', Validators.required],
      pays: [''],
      quartier: [''],
      immeuble: [''],
      typeLocal: [''],
      nomLocal: [''],
      numeroLocal: [''],
      etage: [''],
      localisation: [''],
      categorie: ['']
    });
    this.onglet2Form = this.fb.group({
      fumeur: [''],
      clim: [''],
      piscine: [''],
      wifi: [''],
      animaux: [''],
      chauffage: [''],
      parkingIn: [''],
      gadienJour: [''],
      gardientNuit: [''],
      groupeElect: ['']
    });
    this.onglet3Form = this.fb.group({
      nbrChambre: [''],
      nbrDouche: [''],
      prix: [''],
      typePrix: [''],
      ca: [''],
      charges: [''],
      contrat: ['']
    });
  }

  submit() {
    if (this.onglet1Form.valid && this.onglet2Form.valid && this.onglet3Form.valid) {
      const data = {
        ...this.onglet1Form.value,
        ...this.onglet2Form.value,
        ...this.onglet3Form.value
      };
      this.localService.save(data).subscribe(
        responseApi => {
          if (responseApi.code == 200){
            this.notifier.notify(
              'Local enregistré avec succes',
              'Notification',
              NotificationType.SUCCESS
            );
            this.router.navigate(['../list-all'], {relativeTo: this.route});
          }else{
            this.notifier.notify(
              responseApi.message,
              'Notification',
              NotificationType.WARNING
            );
          }
        },
        error => {
          this.notifier.notify(
            'Erreur du serveur',
            'Notification',
            NotificationType.ERROR
          );
        }
      );
    }else{
      this.notifier.notify(
        'Formulaire invalide',
        'Notification',
        NotificationType.WARNING
      );
    }
  }
}
