import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

export class NavItem {
  public title: string;
  public link?: string;
  public icon?: string;
  public tooltip?: string;
  public hasBadge?: boolean;
  public badgeValue?: number;
  public subItem? = new Array<NavItem>();


  constructor(title: string, link?: string, icon?: string, tooltip?: string, hasBadge?: boolean, badgeValue?: number, subItem?: Array<NavItem>) {
    this.title = title;
    this.link = link;
    this.icon = icon;
    this.tooltip = tooltip;
    this.hasBadge = hasBadge;
    this.badgeValue = badgeValue;
    this.subItem = subItem;
  }
}

@Component({
  selector: 'ps-navbar',
  templateUrl: './ps-navbar.component.html',
  styleUrls: ['./ps-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PsNavbarComponent implements OnInit {

  @Input()
  navItems: Array<NavItem> = [];

  @Input()
  menuState: string = 'close';

  @Output()
  menuSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void { }

  canMinimize(): boolean{
    return this.menuState === 'open';
  }

  onMenuSelected(navItem: NavItem){
    if (navItem.subItem != undefined && navItem?.subItem.length === 0){
      this.menuSelected.emit(navItem.title);
    }
  }

  toggleMenu(event: any) {
    const targetListElement: HTMLElement = event.target.parentElement.parentElement;
    targetListElement.classList.toggle("show-sub-menu");
    const arrow: HTMLElement = event.target;
    arrow.classList.remove("fa-angle-right");
    arrow.classList.add("fa-angle-down");
    if (!targetListElement.classList.contains("show-sub-menu")){
      arrow.classList.remove("fa-angle-down");
      arrow.classList.add("fa-angle-right");
    }
  }
}
