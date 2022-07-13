import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsVersionComponent } from './ps-version.component';

describe('PsVersionComponent', () => {
  let component: PsVersionComponent;
  let fixture: ComponentFixture<PsVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
