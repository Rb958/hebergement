import {HttpService} from "../http-services/http.service";
import {StorageInfoModel} from "../../models/storage-info.model";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";
import {Env} from "../../utils/Env";
import {Injectable} from "@angular/core";
import { HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UploadService extends HttpService{
 

  private storage = Env.getEnv().server;

  uploadBase64File(storageInfo: StorageInfoModel): Observable<ApiResponseModel<any>> {
    return this.http.post<ApiResponseModel<any>>(`${this.storage}api/file/upload` , storageInfo);
  }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.storage}api/file/upload`, formData, { reportProgress: true });
    return this.http.request(req);
  }
}
