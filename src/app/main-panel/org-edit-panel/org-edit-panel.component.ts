import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-org-edit-panel',
  templateUrl: './org-edit-panel.component.html',
  styleUrls: ['./org-edit-panel.component.css']
})
export class OrgEditPanelComponent implements OnInit {
  title = 'Редактирование организации';

  constructor() { }

  ngOnInit(): void {
  }

}
