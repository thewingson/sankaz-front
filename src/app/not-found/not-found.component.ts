import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.document.body.classList.add('page-not-found');
  }

}
