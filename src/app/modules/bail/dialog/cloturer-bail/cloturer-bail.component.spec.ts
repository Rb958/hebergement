import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloturerBailComponent } from './cloturer-bail.component';

describe('CloturerBailComponent', () => {
  let component: CloturerBailComponent;
  let fixture: ComponentFixture<CloturerBailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloturerBailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloturerBailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
