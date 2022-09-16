import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurParticulierComponent } from './fournisseur-particulier.component';

describe('FournisseurParticulierComponent', () => {
  let component: FournisseurParticulierComponent;
  let fixture: ComponentFixture<FournisseurParticulierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseurParticulierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseurParticulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
