import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFournisseurEntrepriseComponent } from './delete-fournisseur-entreprise.component';

describe('DeleteFournisseurEntrepriseComponent', () => {
  let component: DeleteFournisseurEntrepriseComponent;
  let fixture: ComponentFixture<DeleteFournisseurEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFournisseurEntrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFournisseurEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
