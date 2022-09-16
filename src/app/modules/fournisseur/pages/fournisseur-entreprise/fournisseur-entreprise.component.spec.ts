import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurEntrepriseComponent } from './fournisseur-entreprise.component';

describe('FournisseurEntrepriseComponent', () => {
  let component: FournisseurEntrepriseComponent;
  let fixture: ComponentFixture<FournisseurEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseurEntrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseurEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
