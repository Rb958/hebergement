import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableLocalComponent } from './enable-local.component';

describe('EnableLocalComponent', () => {
  let component: EnableLocalComponent;
  let fixture: ComponentFixture<EnableLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnableLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
