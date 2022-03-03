import { Component, OnInit } from '@angular/core';
import {SidebarNavItem} from "../../model/sidebar-nav-item";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dictionaryChildItems: SidebarNavItem[] = [
      new SidebarNavItem('Город', 'Main', 'flaticon-tea-cup', '/main/dict/city/edit', null),
      new SidebarNavItem('Пол', 'Main', 'flaticon-store', '/main/dict/gender/edit', null),
      new SidebarNavItem('Кат. компании', 'Main', 'flaticon-agenda', '/main/dict/comp-cat/edit', null),
      new SidebarNavItem('Тип санатория', 'Main', 'fa-hot-tub', '/main/dict/san-type/edit', null),
      new SidebarNavItem('Кат. сервиса', 'Main', 'fa-martini-glass', '/main/dict/service-cat/edit', null)
    ];

  model: SidebarNavList = {
    navMain:new SidebarNavItem('Главное', 'Main', 'template', '#', null),
    sidebarNavList:[
      new SidebarNavItem('Санатории', 'Main', 'fa-hot-tub', '/main/san', null),
      new SidebarNavItem('Организации', 'Main', 'fas fa-building', '/main/org', null),
      new SidebarNavItem('Справочники', 'Main', 'fas fa-book', '/main', this.dictionaryChildItems),
      new SidebarNavItem('Брони', 'Main', 'fas fa-tty', '/main/order', null),
      new SidebarNavItem('Настройки', 'Main', 'fas fa-cogs', '/main/settings', null),
      new SidebarNavItem('Пользователи', 'Main', 'fas fa-users', '/main/user', null)
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  htmlgeneration(childItem: SidebarNavItem) {
    alert(childItem.nameRu);
  }

}

export interface SidebarNavList{
  navMain:SidebarNavItem,
  sidebarNavList:SidebarNavItem[];
}
