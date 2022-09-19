import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BailPaymentDialogComponent } from './bail-payment-dialog.component';

describe('BailPaymentDialogComponent', () => {
  let component: BailPaymentDialogComponent;
  let fixture: ComponentFixture<BailPaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BailPaymentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BailPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
