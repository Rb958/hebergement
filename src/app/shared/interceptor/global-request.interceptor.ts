import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Env} from "../utils/Env";
import {AppStore, LocalData} from "../utils/app-store";

@Injectable()
export class GlobalRequestInterceptor implements HttpInterceptor {
  localData: LocalData;
  constructor(
    private appStore: AppStore
  ) {
    this.localData = this.appStore.getData();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      headers: request.headers.set('Accept-Language', this.localData.lang)
    });
    return next.handle(req);
  }
}
