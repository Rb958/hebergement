import { Injectable } from '@angular/core';
import {HttpService} from "../http-services/http.service";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";
import {PageModel} from "../../models/page-model";
import {LocalModel} from "../../models/entity/local.model";

@Injectable({
  providedIn: 'root'
})
export class LocalService extends HttpService{

  url = "api/local";

  getAllLocalPaginated(pageIndex: number, pageSize: number, queryParam: any): Observable<ApiResponseModel<PageModel<LocalModel>>> {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get(`${this.url}/page-query/`, queryParam);
  }

  save(data: any) {
    return this.post(this.url, data);
  }

  deleteLocal(id: number) {
    return this.delete(`${this.url}/${id}`);
  }

  enableLocal(id: number, local: any) {
    return this.patch(`${this.url}/enable/${id}`, local);
  }

  findAllAvailabeLocals(currentPageIndex: number, currentPageElementSize: number, queryParam: any) {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = currentPageIndex;
    queryParam.size = currentPageElementSize;
    return this.get(`${this.url}/available`, queryParam);
  }

  findById(id: string | null) {
    return this.get(`${this.url}/${id}`);
  }

  findAllLocals() {
    return this.get(this.url);
  }

  findmeuble(){
    return this.get(`${this.url}/search/meuble`);
  }

  findBooking(searchValue: any) {
    return this.post(`${this.url}/search/meuble/available`, searchValue);
  }

  findBail(value: any) {
    return this.post(`${this.url}/search/non-meuble/available`, value);
  }

  liberer(id: number) {
    return this.patch(`${this.url}/${id}/liberer`, {});
  }

  occuper(id: number) {
    return this.patch(`${this.url}/${id}/occuper`, {});
  }

  horsService(id: number, indisponibilite: any) {
    return this.patch(`${this.url}/${id}/hors-service`, indisponibilite);
  }

  update(data: any, id: number) {
    return this.put(`${this.url}/${id}`, data);
  }
}
