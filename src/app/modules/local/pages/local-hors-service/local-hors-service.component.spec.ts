import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalHorsServiceComponent } from './local-hors-service.component';

describe('LocalHorsServiceComponent', () => {
  let component: LocalHorsServiceComponent;
  let fixture: ComponentFixture<LocalHorsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalHorsServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalHorsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
