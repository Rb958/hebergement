import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccuperLocalDialogComponent } from './occuper-local-dialog.component';

describe('OccuperLocalDialogComponent', () => {
  let component: OccuperLocalDialogComponent;
  let fixture: ComponentFixture<OccuperLocalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccuperLocalDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccuperLocalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
