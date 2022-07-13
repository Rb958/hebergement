import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsSwitchComponent } from './ps-switch.component';

describe('PsSwitchComponent', () => {
  let component: PsSwitchComponent;
  let fixture: ComponentFixture<PsSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
