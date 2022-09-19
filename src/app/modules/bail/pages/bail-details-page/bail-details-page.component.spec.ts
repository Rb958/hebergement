import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BailDetailsPageComponent } from './bail-details-page.component';

describe('BailDetailsPageComponent', () => {
  let component: BailDetailsPageComponent;
  let fixture: ComponentFixture<BailDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BailDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BailDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
