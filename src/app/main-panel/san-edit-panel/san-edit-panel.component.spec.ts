import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanEditPanelComponent } from './san-edit-panel.component';

describe('SanEditPanelComponent', () => {
  let component: SanEditPanelComponent;
  let fixture: ComponentFixture<SanEditPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanEditPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
