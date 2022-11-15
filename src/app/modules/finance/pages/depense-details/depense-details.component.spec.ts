import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseDetailsComponent } from './depense-details.component';

describe('DepenseDetailsComponent', () => {
  let component: DepenseDetailsComponent;
  let fixture: ComponentFixture<DepenseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepenseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
