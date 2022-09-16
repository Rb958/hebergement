import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppStore, LocalData} from "../utils/app-store";

@Injectable()
export class ApiRequestInterceptor implements HttpInterceptor {

  constructor(
    private appStore: AppStore
  ) {  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const reqClone = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + this.appStore.getData().token)
    });
    return next.handle(reqClone);
  }
}
