import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad, Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {CaisseService} from "../services/services/caisse.service";
import {HttpStatusCode} from "@angular/common/http";
import {NotifierService} from "../components/notification/notifier.service";
import {NotificationType} from "../components/notification/notification-type";
import {AppStore} from "../utils/app-store";

@Injectable({
  providedIn: 'root'
})
export class CashierHasOpenedGuard implements CanActivate, CanLoad {

  constructor(
    private cashierService: CaisseService,
    private router: Router,
    private notifierService: NotifierService,
    private appStore: AppStore
  ) {  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.appStore.getData().hasCashierOpened) {
      this.router.navigateByUrl('/finance/caisse/open');
    }
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.appStore.getData().hasCashierOpened) {
      this.router.navigateByUrl('/finance/caisse/open');
    }
    return true;
  }

}
