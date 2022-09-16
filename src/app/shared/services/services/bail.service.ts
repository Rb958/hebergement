import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";
import {PageModel} from "../../models/page-model";
import {BailModel} from "../../models/entity/bail.model";
import {HttpService} from "../http-services/http.service";

@Injectable({
  providedIn: 'root'
})
export class BailService extends HttpService{
  url = 'api/bail';

  getAllBailPaginated(pageIndex: number, pageSize: number, queryParam: any): Observable<ApiResponseModel<PageModel<BailModel>>> {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get(`${this.url}/page-query/`, queryParam);
  }

  create(bail: any, userId: any) {
    return this.post(`${this.url}/${userId}`, bail);
  }

  cancelBail(id: any) {
    return this.patch(`${this.url}/${id}/cancel`, {});
  }

  getStats(){
    return this.get(`${this.url}/stats`);
  }
}
