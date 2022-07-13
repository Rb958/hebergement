import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsSearchComponent } from './ps-search.component';

describe('PsSearchComponent', () => {
  let component: PsSearchComponent;
  let fixture: ComponentFixture<PsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
