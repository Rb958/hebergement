import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

export enum MenuState {
  OPEN = 'open',
  CLOSE = 'close'
}

@Component({
  selector: 'ps-toolbar',
  templateUrl: './ps-toolbar.component.html',
  styleUrls: ['./ps-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PsToolbarComponent implements OnInit {

  @Input()
  username: string = 'Username';
  @Input()
  userRole: any = 'user';
  @Input()
  badgeValue: number = 0;
  @Input()
  toolbarTitle: string = 'dashboard';
  @Input()
  userAvatar: string = ''

  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  handleMenu: EventEmitter<MenuState> = new EventEmitter<MenuState>();
  @Output()
  handleLogout: EventEmitter<any> = new EventEmitter<any>();

  menuState: MenuState = MenuState.OPEN;
  searchValue: string = '';

  avatarSanitized: SafeResourceUrl = {} as SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.avatarSanitized = this.sanitizer.bypassSecurityTrustResourceUrl(this.userAvatar);
  }

  menuClicked() {
    if (this.menuState === MenuState.OPEN){
      this.menuState = MenuState.CLOSE;
      this.handleMenu.emit(this.menuState);
    }else{
      this.menuState = MenuState.OPEN;
      this.handleMenu.emit(this.menuState);
    }
  }

  enterPressed() {
    if (this.searchValue){
      this.search.emit(this.searchValue)
      this.searchValue = '';
    }
  }

  logout() {
    this.handleLogout.emit(true);
  }
}
