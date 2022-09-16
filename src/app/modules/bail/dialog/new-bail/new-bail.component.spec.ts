import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBailComponent } from './new-bail.component';

describe('NewBailComponent', () => {
  let component: NewBailComponent;
  let fixture: ComponentFixture<NewBailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
