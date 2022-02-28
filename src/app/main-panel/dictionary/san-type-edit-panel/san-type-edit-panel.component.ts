import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-san-type-edit-panel',
  templateUrl: './san-type-edit-panel.component.html',
  styleUrls: ['./san-type-edit-panel.component.css']
})
export class SanTypeEditPanelComponent implements OnInit {
  title = 'Тип санатория';

  constructor() { }

  ngOnInit(): void {
  }

}
