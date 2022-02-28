import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-san-panel',
  templateUrl: './san-panel.component.html',
  styleUrls: ['./san-panel.component.css', "../main-panel.component.css"]
})
export class SanPanelComponent implements OnInit {

  title = 'Санатории';

  constructor() { }

  ngOnInit(): void {
  }

}
