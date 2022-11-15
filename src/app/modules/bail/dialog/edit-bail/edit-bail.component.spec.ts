import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBailComponent } from './edit-bail.component';

describe('EditBailComponent', () => {
  let component: EditBailComponent;
  let fixture: ComponentFixture<EditBailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
