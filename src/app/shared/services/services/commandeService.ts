import {HttpService} from "../http-services/http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";
import {PageModel} from "../../models/page-model";
import {CommandeModel} from "../../models/entity/commande.model";

@Injectable({
  providedIn: 'root'
})
export class CommandeService extends HttpService{
  url = 'api/commande';

  getAllCommandePaginated(pageIndex: number, pageSize: number, queryParam: any): Observable<ApiResponseModel<PageModel<CommandeModel>>> {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get(`${this.url}/page-query/`, queryParam);
  }

  deleteCommande(id: any) {
    return this.delete(`${this.url}/${id}`);
  }

  create(commande: any) {
    return this.post(this.url, commande);
  }

  updateCommande(commande: any, id: number) {
    return this.put(`${this.url}/${id}`, commande);
  }

  findAllCommandes() {
    return this.get(this.url);
  }

  findById(id: any) {
    return this.get(`${this.url}/${id}`);
  }
}
