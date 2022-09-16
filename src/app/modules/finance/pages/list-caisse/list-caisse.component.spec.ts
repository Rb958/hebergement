import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCaisseComponent } from './list-caisse.component';

describe('ListCaisseComponent', () => {
  let component: ListCaisseComponent;
  let fixture: ComponentFixture<ListCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCaisseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
