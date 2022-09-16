import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCommandeComponent } from './delete-commande.component';

describe('DeleteCommandeComponent', () => {
  let component: DeleteCommandeComponent;
  let fixture: ComponentFixture<DeleteCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
