import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDepenseComponent } from './delete-depense.component';

describe('DeleteDepenseComponent', () => {
  let component: DeleteDepenseComponent;
  let fixture: ComponentFixture<DeleteDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDepenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
