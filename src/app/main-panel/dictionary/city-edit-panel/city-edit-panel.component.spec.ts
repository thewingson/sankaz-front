import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityEditPanelComponent } from './city-edit-panel.component';

describe('CityEditPanelComponent', () => {
  let component: CityEditPanelComponent;
  let fixture: ComponentFixture<CityEditPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityEditPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
