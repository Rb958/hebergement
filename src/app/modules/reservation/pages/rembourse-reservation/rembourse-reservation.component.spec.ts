import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RembourseReservationComponent } from './rembourse-reservation.component';

describe('RembourseReservationComponent', () => {
  let component: RembourseReservationComponent;
  let fixture: ComponentFixture<RembourseReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RembourseReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RembourseReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
