import {Injectable} from "@angular/core";
import {HttpService} from "../http-services/http.service";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";
import {PageModel} from "../../models/page-model";
import {LocalModel} from "../../models/entity/local.model";
import {EmployeModel} from "../../models/entity/employe.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends HttpService{
  url = 'api/employee';

  getAllEmployeePaginated(pageIndex: number, pageSize: number, queryParam: any): Observable<ApiResponseModel<PageModel<EmployeModel>>> {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get(`${this.url}/page-query/`, queryParam);
  }

  public create(employee: any) {
    return this.post(this.url, employee);
  }

  updateEmployee(employee: any, id: any) {
    return this.put(`${this.url}/${id}`, employee);
  }

  deleteEmployee(data: any) {
    return this.delete(`${this.url}/${data?.id}`);
  }
}
