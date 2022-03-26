import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPanelComponent } from './booking-panel.component';

describe('BookingPanelComponent', () => {
  let component: BookingPanelComponent;
  let fixture: ComponentFixture<BookingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
