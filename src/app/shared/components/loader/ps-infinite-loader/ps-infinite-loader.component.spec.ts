import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsInfiniteLoaderComponent } from './ps-infinite-loader.component';

describe('PsInfiniteLoaderComponent', () => {
  let component: PsInfiniteLoaderComponent;
  let fixture: ComponentFixture<PsInfiniteLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsInfiniteLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsInfiniteLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
