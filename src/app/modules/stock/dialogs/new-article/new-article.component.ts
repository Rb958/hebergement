import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {ArticleService} from "../../../../shared/services/services/article.service";
import {ArticleModel} from "../../../../shared/models/entity/article.model";

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {

  articleForm: FormGroup = {} as FormGroup;
  isEdition: boolean;

  constructor(
    private dialogRef: MatDialogRef<NewArticleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private articleService: ArticleService,
    private notifierService: NotifierService
  ) {
    this.isEdition = false;
  }

  ngOnInit(): void {
    this.isEdition = this.data.edition;
    if (this.data.edition){
      this.initForm(this.data.article);
    }else{
      this.initForm();
    }
  }

  private initForm(article?: ArticleModel) {
    if (article) {
      this.articleForm = this.fb.group({
        designation: [article?.designation, Validators.required]
      });
    } else {
      this.articleForm = this.fb.group({
        designation: ['', Validators.required]
      });
    }
  }

  saveArticle() {
    if (this.articleForm.valid) {
      if (!this.data.edition) {
        this.articleService.create(this.articleForm.value).subscribe(
          apiResponse => {
            this.processSuccess(apiResponse);
          },
          error => {
            this.processError(error);
          }
        );
      }else{
        this.articleService.updateArticle(this.articleForm.value, this.data.article.id).subscribe(
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
        'Article enregistré avec succès',
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
