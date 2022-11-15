import { BehaviorSubject } from 'rxjs';
import { Subscription, takeLast, takeUntil } from 'rxjs';
import { Component, DoCheck, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {AppStore, LocalData} from "./shared/utils/app-store";
import {NavItem} from "./shared/components/layout/ps-navbar/ps-navbar.component";
import {MenuState} from "./shared/components/layout/ps-toolbar/ps-toolbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Gestion logement';
  authenticated: boolean = false;
  menuItems: Array<NavItem> = new Array<NavItem>();
  menuState: MenuState = MenuState.OPEN;
  currentTitle: string = 'dashboard';
  localData: LocalData = {} as LocalData;
  hasCashierOpened:  boolean = false;
  hasCashierOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  localDataSubscription: Subscription = {} as Subscription;

  constructor(
    private translate: TranslateService,
    private router: Router,
    public appStore: AppStore
  ) {

    const arrayLang = ['en-EN', 'fr-FR'];
    const defaultLang = 'fr-FR';
    const userLang = navigator.language;
    let lang =  userLang.substring(0, 2 ).toLowerCase();

    // if (arrayLang.lastIndexOf(lang) < 0) {
      lang = defaultLang;
    // }

    if (!this.appStore.isInitialized()){
      this.appStore.initialize(lang);
    }

    this.localData = this.appStore.getData();

    if (this.localData) {
      translate.setDefaultLang(<string> this.localData?.lang);
    } else {
      translate.setDefaultLang(defaultLang);
    }

    this.title = <string>this.localData?.appName;

    this.hasCashierOpened$.subscribe(value => {
      this.hasCashierOpened = value;
    })
  }

  ngOnInit(): void {
    this.checkSession();
    console.dir(this.localData)
    this.menuItems = [
      new NavItem(
        'dashboard',
        '/dashboard',
        'bx bxs-dashboard',
        'dashboard',
        false,
        0,
        []
      ),
      new NavItem(
        'Locaux',
        '/local',
        'bx bx-building-house',
        'Locaux',
        false,
        0,
        []
      ),
      new NavItem(
        'Locataires',
        undefined,
        'bx bx-user-pin',
        'Locataires',
        false,
        0,
        [
          new NavItem(
            'Societe',
            '/locataire/societe/list-all',
            undefined,
            'Societe',
            false,
            undefined,
            []
          ),
          new NavItem(
            'particulier',
            '/locataire/particulier/list-all',
            undefined,
            'Particulier',
            false,
            undefined,
            []
          )
        ]
      ),
      new NavItem(
        'Employés',
        '/employe',
        'bx bxs-user-badge',
        'Employés',
        false,
        0,
        []
      ),
      new NavItem(
        'Utilisateurs',
        '/user',
        'bx bx-user',
        'Utilisateurs',
        false,
        0,
        []
      ),
      new NavItem(
        'Reservation',
        '/reservation',
        'bx bx-calendar-star',
        'Reservation',
        false,
        0,
        [
          new NavItem(
            'Calendrier',
            '/reservation/calendrier',
            'bx bx-clipboard',
            'Calendrier de reservation',
            false,
            0,
            []
          ),
        ]
      ),
      new NavItem(
        'Bails',
        '/bails',
        'bx bx-clipboard',
        'Bails',
        false,
        0,
        []
      ),
      new NavItem(
        'Finances',
        // '/finance',
        undefined,
        'bx bxs-bank',
        'Finances',
        false,
        0,
        [
          new NavItem(
            'Depenses',
            '/finance/depense',
            undefined,
            'Depenses',
            false,
            0,
            []
          ),
          new NavItem(
            'Caisses',
            '/finance/caisse',
            undefined,
            'Caisses',
            false,
            0,
            []
          ),
          new NavItem(
          'Transfert de caisse',
          '/finance/transfert-caisse',
          undefined,
          'Transfert de caisse',
          false,
          0,
          []
          )
        ]
      ),
      new NavItem(
        'Fournisseurs',
        undefined,
        'bx bx-hard-hat',
        'Fournisseurs',
        false,
        0,
        [
          new NavItem(
            'particulier',
            '/fournisseur/particulier',
            'bx bx-hard-hat',
            'Fournisseurs particulier',
            false,
            0,
            []
          ),
          new NavItem(
            'Entreprise',
            '/fournisseur/entreprise',
            'bx bx-hard-hat',
            'Fournisseurs entreprise',
            false,
            0,
            []
          ),
        ]
      ),
      // new NavItem(
      //   'Stock',
      //   '/stock',
      //   'bx bx-package',
      //   'Stock',
      //   false,
      //   0,
      //   [
      //     new NavItem(
      //       'Articles',
      //       '/stock/article',
      //       'bx bx-hard-hat',
      //       'Articles',
      //       false,
      //       0,
      //       []
      //     ),
      //     new NavItem(
      //       'Commande',
      //       '/stock/commande',
      //       'bx bx-hard-hat',
      //       'Commandes',
      //       false,
      //       0,
      //       []
      //     )
      //   ]
      // )
    ];
  }

  onSearch(value: string) {
    console.log("Search Handled with value: "+ value);
    console.dir(value);
  }

  onMenuHandled(menuState: MenuState) {
    this.menuState = menuState;
  }

  getTitle($event: string) {
    this.currentTitle = $event;
  }

  showProfile(){
    this.router.navigateByUrl("/user/user-profile");
  }

  showParams(){
    this.router.navigateByUrl("/user/client");
  }

  checkSession(){
    if (this.appStore.isInitialized()){
      this.appStore.getSessionState().subscribe(value => {
        if (!value){
          console.log("session expired");
          this.logout()
        }else{
          console.log("session running");
        }
      });
    }
  }

  logout() {
    this.hasCashierOpened = false;
    this.appStore.logout(this.localData);
    this.router.navigateByUrl("/");
  }

  ngOnDestroy(): void {
    this.hasCashierOpened = false;
    if(this.localDataSubscription){
      this.localDataSubscription.unsubscribe();
    }
  }
}
