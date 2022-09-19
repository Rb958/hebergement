import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatairePartDetailsComponent } from './locataire-part-details.component';

describe('LocatairePartDetailsComponent', () => {
  let component: LocatairePartDetailsComponent;
  let fixture: ComponentFixture<LocatairePartDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocatairePartDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocatairePartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
