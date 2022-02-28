import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-edit-panel',
  templateUrl: './room-edit-panel.component.html',
  styleUrls: ['./room-edit-panel.component.css']
})
export class RoomEditPanelComponent implements OnInit {
  title = 'Редактирование номера';

  constructor() { }

  ngOnInit(): void {
  }

}
