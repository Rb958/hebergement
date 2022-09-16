import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFournisseurEntrepriseComponent } from './new-fournisseur-entreprise.component';

describe('NewFournisseurEntrepriseComponent', () => {
  let component: NewFournisseurEntrepriseComponent;
  let fixture: ComponentFixture<NewFournisseurEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFournisseurEntrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFournisseurEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
