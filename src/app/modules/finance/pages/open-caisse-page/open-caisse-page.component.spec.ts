import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCaissePageComponent } from './open-caisse-page.component';

describe('OpenCaissePageComponent', () => {
  let component: OpenCaissePageComponent;
  let fixture: ComponentFixture<OpenCaissePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenCaissePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenCaissePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
