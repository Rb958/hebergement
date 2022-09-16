import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFournisseurPartculierComponent } from './new-fournisseur-partculier.component';

describe('NewFournisseurPartculierComponent', () => {
  let component: NewFournisseurPartculierComponent;
  let fixture: ComponentFixture<NewFournisseurPartculierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFournisseurPartculierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFournisseurPartculierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
