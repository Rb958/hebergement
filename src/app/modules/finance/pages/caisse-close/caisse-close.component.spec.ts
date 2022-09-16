import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseCloseComponent } from './caisse-close.component';

describe('CaisseCloseComponent', () => {
  let component: CaisseCloseComponent;
  let fixture: ComponentFixture<CaisseCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaisseCloseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaisseCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
