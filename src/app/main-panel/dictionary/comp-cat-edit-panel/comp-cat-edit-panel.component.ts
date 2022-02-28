import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp-cat-edit-panel',
  templateUrl: './comp-cat-edit-panel.component.html',
  styleUrls: ['./comp-cat-edit-panel.component.css']
})
export class CompCatEditPanelComponent implements OnInit {
  title = 'Категории компании';

  constructor() { }

  ngOnInit(): void {
  }

}
