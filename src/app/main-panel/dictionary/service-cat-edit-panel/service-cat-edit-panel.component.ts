import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-cat-edit-panel',
  templateUrl: './service-cat-edit-panel.component.html',
  styleUrls: ['./service-cat-edit-panel.component.css']
})
export class ServiceCatEditPanelComponent implements OnInit {
  title = 'Категории сервиса';

  constructor() { }

  ngOnInit(): void {
  }

}
