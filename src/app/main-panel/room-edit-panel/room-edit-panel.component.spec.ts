import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEditPanelComponent } from './room-edit-panel.component';

describe('RoomEditPanelComponent', () => {
  let component: RoomEditPanelComponent;
  let fixture: ComponentFixture<RoomEditPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomEditPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
