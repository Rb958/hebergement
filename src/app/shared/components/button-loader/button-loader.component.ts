import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ContentChild, ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {ButtonLoaderIconDirective} from "./button-loader-icon.directive";

@Component({
  selector: 'button[rbButton]',
  templateUrl: './button-loader.component.html',
  styleUrls: ['./button-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonLoaderComponent implements OnInit, OnChanges {
  @HostBinding('class.loading')
  @HostBinding('attr.aria-disabled')
  @Input('loading')
  loading = false;

  @Input('disableOnLoading')
  disableOnLoading = true;

  @HostBinding('class')
  get classes(): string {
    return this.variant || 'primary';
  }

  @ContentChild(ButtonLoaderIconDirective)
  icon: ButtonLoaderIconDirective = {} as ButtonLoaderIconDirective;

  constructor(
    @Attribute('variant')
    private variant: 'priramy' | 'secondary' | 'outline',
    private elt: ElementRef<HTMLButtonElement>
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.elt.nativeElement.disabled  = !!(changes['loading'].currentValue && this.disableOnLoading);
  }

  ngOnInit(): void {
  }

}
