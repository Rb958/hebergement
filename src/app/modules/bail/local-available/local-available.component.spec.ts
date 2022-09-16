import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAvailableComponent } from './local-available.component';

describe('LocalAvailableComponent', () => {
  let component: LocalAvailableComponent;
  let fixture: ComponentFixture<LocalAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalAvailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
