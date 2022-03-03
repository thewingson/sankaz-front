import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPanelComponent } from './org-panel.component';

describe('OrgPanelComponent', () => {
  let component: OrgPanelComponent;
  let fixture: ComponentFixture<OrgPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
