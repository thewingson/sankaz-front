import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css', "../main-panel.component.css"]
})
export class UserPanelComponent implements OnInit {

  title = 'Пользователи';

  constructor() { }

  ngOnInit(): void {
  }

}
