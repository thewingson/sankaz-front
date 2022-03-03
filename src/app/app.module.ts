import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MainHeaderComponent} from './main-header/main-header.component';
import {MainPanelComponent} from './main-panel/main-panel.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule, Routes} from "@angular/router";
import {SanPanelComponent} from './main-panel/san-panel/san-panel.component';
import {OrgPanelComponent} from './main-panel/org-panel/org-panel.component';
import {UserPanelComponent} from './main-panel/user-panel/user-panel.component';
import {NavbarComponent} from './sidebar/navbar/navbar.component';
import {NavbarItemComponent} from './sidebar/navbar/navbar-item/navbar-item.component';
import {CityEditPanelComponent} from './main-panel/dictionary/city-edit-panel/city-edit-panel.component';
import {CompCatEditPanelComponent} from './main-panel/dictionary/comp-cat-edit-panel/comp-cat-edit-panel.component';
import {GenderEditPanelComponent} from './main-panel/dictionary/gender-edit-panel/gender-edit-panel.component';
import {SanTypeEditPanelComponent} from './main-panel/dictionary/san-type-edit-panel/san-type-edit-panel.component';
import {OrgEditPanelComponent} from './main-panel/org-edit-panel/org-edit-panel.component';
import {SanEditPanelComponent} from './main-panel/san-edit-panel/san-edit-panel.component';
import {RoomEditPanelComponent} from './main-panel/room-edit-panel/room-edit-panel.component';
import {UserProfileComponent} from './main-panel/user-profile/user-profile.component';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ServiceCatEditPanelComponent} from "./main-panel/dictionary/service-cat-edit-panel/service-cat-edit-panel.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";

const appRoutes : Routes = [
  { path:'', redirectTo:'/main', pathMatch:'full' },
  { path:'login', component:LoginComponent },
  {
    path:'main', component:MainComponent,
    children:[
      {path:'san', component:SanPanelComponent},
      {path:'org', component:OrgPanelComponent},
      {path:'user', component:UserPanelComponent},
      {path:'dict',children:[
          {path:'city/edit', component:CityEditPanelComponent},
          {path:'comp-cat/edit', component:CompCatEditPanelComponent},
          {path:'gender/edit', component:GenderEditPanelComponent},
          {path:'san-type/edit', component:SanTypeEditPanelComponent},
          {path:'service-cat/edit', component:ServiceCatEditPanelComponent},
        ]}
    ]
  },
  { path:'**', component:NotFoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainHeaderComponent,
    MainPanelComponent,
    SanPanelComponent,
    OrgPanelComponent,
    UserPanelComponent,
    NavbarComponent,
    NavbarItemComponent,
    CityEditPanelComponent,
    CompCatEditPanelComponent,
    GenderEditPanelComponent,
    SanTypeEditPanelComponent,
    OrgEditPanelComponent,
    SanEditPanelComponent,
    RoomEditPanelComponent,
    UserProfileComponent,
    LoginComponent,
    MainComponent,
    NotFoundComponent,
    ServiceCatEditPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    ,RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule,FormsModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
