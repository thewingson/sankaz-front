import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanTypeEditPanelComponent } from './san-type-edit-panel.component';

describe('SanTypeEditPanelComponent', () => {
  let component: SanTypeEditPanelComponent;
  let fixture: ComponentFixture<SanTypeEditPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanTypeEditPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanTypeEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
