import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLocalComponent } from './change-local.component';

describe('ChangeLocalComponent', () => {
  let component: ChangeLocalComponent;
  let fixture: ComponentFixture<ChangeLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeLocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
