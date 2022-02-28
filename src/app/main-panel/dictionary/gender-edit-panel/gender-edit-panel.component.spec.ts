import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderEditPanelComponent } from './gender-edit-panel.component';

describe('GenderEditPanelComponent', () => {
  let component: GenderEditPanelComponent;
  let fixture: ComponentFixture<GenderEditPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderEditPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
