import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBailPageComponent } from './list-bail-page.component';

describe('ListBailPageComponent', () => {
  let component: ListBailPageComponent;
  let fixture: ComponentFixture<ListBailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
