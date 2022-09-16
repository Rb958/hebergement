import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTransfertComponent } from './new-transfert.component';

describe('NewTransfertComponent', () => {
  let component: NewTransfertComponent;
  let fixture: ComponentFixture<NewTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTransfertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
