import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanPanelComponent } from './san-panel.component';

describe('SanPanelComponent', () => {
  let component: SanPanelComponent;
  let fixture: ComponentFixture<SanPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
