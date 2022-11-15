import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloturerReservationComponent } from './cloturer-reservation.component';

describe('CloturerReservationComponent', () => {
  let component: CloturerReservationComponent;
  let fixture: ComponentFixture<CloturerReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloturerReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloturerReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
