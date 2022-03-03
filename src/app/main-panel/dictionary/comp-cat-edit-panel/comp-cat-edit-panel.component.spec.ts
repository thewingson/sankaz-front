import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompCatEditPanelComponent } from './comp-cat-edit-panel.component';

describe('CompCatEditPanelComponent', () => {
  let component: CompCatEditPanelComponent;
  let fixture: ComponentFixture<CompCatEditPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompCatEditPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompCatEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
