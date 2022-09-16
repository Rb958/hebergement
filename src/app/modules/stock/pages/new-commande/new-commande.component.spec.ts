import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommandeComponent } from './new-commande.component';

describe('NewCommandeComponent', () => {
  let component: NewCommandeComponent;
  let fixture: ComponentFixture<NewCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
