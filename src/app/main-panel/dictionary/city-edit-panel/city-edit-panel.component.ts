import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-edit-panel',
  templateUrl: './city-edit-panel.component.html',
  styleUrls: ['./city-edit-panel.component.css']
})
export class CityEditPanelComponent implements OnInit {
  title = 'Город';

  constructor() { }

  ngOnInit(): void {
  }

}
