import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgEditPanelComponent } from './org-edit-panel.component';

describe('OrgEditPanelComponent', () => {
  let component: OrgEditPanelComponent;
  let fixture: ComponentFixture<OrgEditPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgEditPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
