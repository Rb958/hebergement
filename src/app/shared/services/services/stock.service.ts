import {HttpService} from "../http-services/http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";
import {PageModel} from "../../models/page-model";
import {StockModel} from "../../models/entity/stock.model";

@Injectable({
  providedIn: 'root'
})
export class StockService extends HttpService{
  url = 'api/stock';

  getAllStockPaginated(pageIndex: number, pageSize: number, queryParam: any): Observable<ApiResponseModel<PageModel<StockModel>>> {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get(`${this.url}/page-query/`, queryParam);
  }
}
