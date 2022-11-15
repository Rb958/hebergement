import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseDetailsAdminComponent } from './caisse-details-admin.component';

describe('CaisseDetailsAdminComponent', () => {
  let component: CaisseDetailsAdminComponent;
  let fixture: ComponentFixture<CaisseDetailsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaisseDetailsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaisseDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
