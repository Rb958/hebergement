import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLocalComponent } from './new-local.component';

describe('NewLocalComponent', () => {
  let component: NewLocalComponent;
  let fixture: ComponentFixture<NewLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
