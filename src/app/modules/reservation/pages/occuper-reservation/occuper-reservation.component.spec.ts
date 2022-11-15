import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccuperReservationComponent } from './occuper-reservation.component';

describe('OccuperReservationComponent', () => {
  let component: OccuperReservationComponent;
  let fixture: ComponentFixture<OccuperReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccuperReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccuperReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
