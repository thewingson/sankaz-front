import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {SidebarNavItem} from "../../../model/sidebar-nav-item";

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css']
})
export class NavbarItemComponent implements OnInit {

  @Input() navItem: SidebarNavItem;

  constructor() {
    console.log(this.navItem);
  }

  ngOnInit(): void {
  }

  htmlgeneration(childItem: SidebarNavItem) {
    alert(childItem.nameRu);
  }
}
