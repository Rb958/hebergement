import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelBailComponent } from './cancel-bail.component';

describe('CancelBailComponent', () => {
  let component: CancelBailComponent;
  let fixture: ComponentFixture<CancelBailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelBailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelBailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
