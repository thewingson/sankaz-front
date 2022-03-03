import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gender-edit-panel',
  templateUrl: './gender-edit-panel.component.html',
  styleUrls: ['./gender-edit-panel.component.css']
})
export class GenderEditPanelComponent implements OnInit {
  title = 'Пол';

  constructor() { }

  ngOnInit(): void {
  }

}
