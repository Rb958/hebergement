import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTransfertComponent } from './delete-transfert.component';

describe('DeleteTransfertComponent', () => {
  let component: DeleteTransfertComponent;
  let fixture: ComponentFixture<DeleteTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTransfertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
