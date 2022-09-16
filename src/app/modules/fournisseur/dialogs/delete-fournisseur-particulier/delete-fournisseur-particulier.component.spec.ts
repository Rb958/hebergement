import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFournisseurParticulierComponent } from './delete-fournisseur-particulier.component';

describe('DeleteFournisseurParticulierComponent', () => {
  let component: DeleteFournisseurParticulierComponent;
  let fixture: ComponentFixture<DeleteFournisseurParticulierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFournisseurParticulierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFournisseurParticulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
