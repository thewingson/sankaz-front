import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment'

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {
  hostURL = environment.hostURL

  constructor() { }

  ngOnInit(): void {
  }

}
