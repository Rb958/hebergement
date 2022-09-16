import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CaisseService} from "../../../../shared/services/services/caisse.service";
import {NotifierService} from "../../../../shared/components/notification/notifier.service";
import {NotificationType} from "../../../../shared/components/notification/notification-type";
import {ArticleService} from "../../../../shared/services/services/article.service";

@Component({
  selector: 'app-delete-article',
  templateUrl: './delete-article.component.html',
  styleUrls: ['./delete-article.component.scss']
})
export class DeleteArticleComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteArticleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private articleService: ArticleService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
  }

  performAction() {
    this.articleService.deleteArticle(this.data).subscribe(
      apiResponse => {
        if (apiResponse.code == 200){
          this.notifierService.notify(
            apiResponse.message,
            'Succès',
            NotificationType.SUCCESS
          );
          this.dialogRef.close(true);
        }else{
          this.notifierService.notify(
            apiResponse.message,
            'Erreur',
            NotificationType.ERROR
          );
          this.dialogRef.close(false);
        }
      },
      error => {
        this.notifierService.notify(
          "Erreur de comminucation avec le serveur",
          'Erreur',
          NotificationType.ERROR
        );
        this.dialogRef.close(false);
      }
    );
  }
}
