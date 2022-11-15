import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RembourseBailComponent } from './rembourse-bail.component';

describe('RembourseBailComponent', () => {
  let component: RembourseBailComponent;
  let fixture: ComponentFixture<RembourseBailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RembourseBailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RembourseBailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
