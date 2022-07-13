import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLocataireComponent } from './new-locataire.component';

describe('NewLocataireComponent', () => {
  let component: NewLocataireComponent;
  let fixture: ComponentFixture<NewLocataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLocataireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLocataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
