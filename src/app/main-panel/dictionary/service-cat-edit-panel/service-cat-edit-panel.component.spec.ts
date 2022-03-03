import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCatEditPanelComponent } from './service-cat-edit-panel.component';

describe('SanTypeEditPanelComponent', () => {
  let component: ServiceCatEditPanelComponent;
  let fixture: ComponentFixture<ServiceCatEditPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCatEditPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCatEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
