import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {AppStore} from "./shared/utils/app-store";
import {NavItem} from "./shared/components/layout/ps-navbar/ps-navbar.component";
import {MenuState} from "./shared/components/layout/ps-toolbar/ps-toolbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'School Portal';
  authenticated: boolean = false;
  menuItems: Array<NavItem> = new Array<NavItem>();
  menuState: MenuState = MenuState.OPEN;
  currentTitle: string = 'dashboard';

  constructor(
    private translate: TranslateService,
    private router: Router,
    public appStore: AppStore
  ) {

    const arrayLang = ['en', 'fr'];
    const defaultLang = 'fr';
    const userLang = navigator.language;
    let lang =  userLang.substring(0, 2 ).toLowerCase();

    if (arrayLang.lastIndexOf(lang) < 0) {
      lang = defaultLang;
    }
    if (!this.appStore.isInitialized()){
      this.appStore.initialize(lang);
    }
    if (this.appStore.getData()) {
      translate.setDefaultLang(<string> this.appStore.getData()?.lang);
    } else {
      translate.setDefaultLang(defaultLang);
    }
    this.title = <string>this.appStore.getData()?.appName;
  }

  ngOnInit(): void {
    this.checkSession();
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
        'Locals',
        '/local',
        'bx bx-building-house',
        'Locals',
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
        []
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
        '/finance',
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
        '/fournisseur',
        'bx bx-hard-hat',
        'Fournisseurs',
        false,
        0,
        []
      )
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
    const localData = this.appStore.getData();
    localData.token = null;
    localData.sessionExists = false;
    localData.userName = 'USER';
    localData.userRole = 'UNKNOWN';
    this.appStore.save(localData);
    this.router.navigateByUrl("/");
  }
}
