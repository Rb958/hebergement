import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLocataireParticulierComponent } from './list-locataire-particulier.component';

describe('ListLocataireParticulierComponent', () => {
  let component: ListLocataireParticulierComponent;
  let fixture: ComponentFixture<ListLocataireParticulierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLocataireParticulierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLocataireParticulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
