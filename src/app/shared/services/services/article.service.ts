import {HttpService} from "../http-services/http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";
import {PageModel} from "../../models/page-model";
import {ArticleModel} from "../../models/entity/article.model";

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends HttpService {
  url = 'api/article';

  getAllArticlePaginated(pageIndex: number, pageSize: number, queryParam: any): Observable<ApiResponseModel<PageModel<ArticleModel>>> {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get(`${this.url}/page-query/`, queryParam);
  }

  deleteArticle(article: any) {
    return this.delete(`${this.url}/${article?.id}`);
  }

  create(article: any) {
    return this.post(this.url, article);
  }

  updateArticle(article: any, id: number) {
    return this.put(`${this.url}/${id}`, article);
  }

  findAllArticles() {
    return this.get(this.url);
  }
}
