import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-org-panel',
  templateUrl: './org-panel.component.html',
  styleUrls: ['./org-panel.component.css', "../main-panel.component.css"]
})
export class OrgPanelComponent implements OnInit {

  title = 'Организации';

  constructor() { }

  ngOnInit(): void {
  }

}
