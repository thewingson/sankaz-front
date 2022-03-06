import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-san-edit-panel',
  templateUrl: './san-edit-panel.component.html',
  styleUrls: ['./san-edit-panel.component.css']
})
export class SanEditPanelComponent implements OnInit {
  title = 'Редактирование санатория';

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
