import { Injectable } from '@angular/core';
import {HttpService} from "../http-services/http.service";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";
import {PageModel} from "../../models/page-model";
import {CaisseModel} from "../../models/entity/caisse.model";

@Injectable({
  providedIn: 'root'
})
export class CaisseService extends HttpService{

  url = 'api/caisse';

  getAllCaissePaginated(pageIndex: number, pageSize: number, queryParam: any): Observable<ApiResponseModel<PageModel<CaisseModel>>> {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get(`${this.url}/page-query/`, queryParam);
  }

  deleteCaisse(caisse: any) {
    return this.delete(`${this.url}/${caisse?.id}`);
  }

  create(caisse: CaisseModel) {
    return this.post(this.url, caisse);
  }

  updateCaisse(caisse: CaisseModel, id: number) {
    return this.put(`${this.url}/${id}`, caisse);
  }

  findAllCaisse() {
    return this.get(this.url);
  }

  checkCashierHasOpened(userId: any) {
    return this.get(`${this.url}/opened/${userId}`);
  }

  findCaisseByUserId(userId: any) {
    return this.get(`${this.url}/user/${userId}`);
  }

  openCaisse(cashier: any) {
    console.dir(cashier);
    return this.post(`${this.url}/open`, cashier);
  }

  closeCaisse(cashier: CaisseModel) {
    return this.post(`${this.url}/close-request`, cashier)
  }

  validate(caisse: CaisseModel) {
    return this.get(`${this.url}/validate/${caisse.id}`);
  }
}
