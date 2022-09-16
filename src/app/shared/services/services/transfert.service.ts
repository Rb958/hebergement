import {Injectable} from "@angular/core";
import {HttpService} from "../http-services/http.service";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";
import {PageModel} from "../../models/page-model";
import {CaisseModel} from "../../models/entity/caisse.model";
import {TransfertModel} from "../../models/entity/transfert.model";

@Injectable({
  providedIn: 'root'
})
export class TransfertService extends HttpService{
  url = 'api/transfert-caisse';

  getAllCaissePaginated(pageIndex: number, pageSize: number, queryParam: any): Observable<ApiResponseModel<PageModel<TransfertModel>>> {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get(`${this.url}/page-query/`, queryParam);
  }

  create(transfert: any) {
    return this.post(this.url, transfert);
  }

  updateDepense(transfert: any, id: number) {
    return this.put(`${this.url}/${id}`, transfert);
  }
}
