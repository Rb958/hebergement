import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsNavbarComponent } from './ps-navbar.component';

describe('PsNavbarComponent', () => {
  let component: PsNavbarComponent;
  let fixture: ComponentFixture<PsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
