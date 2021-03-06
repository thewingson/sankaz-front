import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SanPanelComponent } from './main-panel/san-panel/san-panel.component';
import {
  ApproveDialog,
  OrgApproveDialog,
  OrgPanelComponent,
} from './main-panel/org-panel/org-panel.component';
import { UserPanelComponent } from './main-panel/user-panel/user-panel.component';
import { NavbarComponent } from './sidebar/navbar/navbar.component';
import { NavbarItemComponent } from './sidebar/navbar/navbar-item/navbar-item.component';
import { CityEditPanelComponent } from './main-panel/dictionary/city-edit-panel/city-edit-panel.component';
import { CompCatEditPanelComponent } from './main-panel/dictionary/comp-cat-edit-panel/comp-cat-edit-panel.component';
import { GenderEditPanelComponent } from './main-panel/dictionary/gender-edit-panel/gender-edit-panel.component';
import { SanTypeEditPanelComponent } from './main-panel/dictionary/san-type-edit-panel/san-type-edit-panel.component';
import { OrgEditPanelComponent } from './main-panel/org-edit-panel/org-edit-panel.component';
import { SanEditPanelComponent } from './main-panel/san-edit-panel/san-edit-panel.component';
import { RoomEditPanelComponent } from './main-panel/room-edit-panel/room-edit-panel.component';
import { UserProfileComponent } from './main-panel/user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServiceCatEditPanelComponent } from './main-panel/dictionary/service-cat-edit-panel/service-cat-edit-panel.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { UserForOrgComponent } from './main-panel/org-edit-panel/user-for-org/user-for-org.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import {
  BookingPanelComponent,
  RoomForBookingComponent,
  HistoryForBookingComponent,
} from './main-panel/booking-panel/booking-panel.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RoomClassPanelComponent } from './main-panel/dictionary/room-class-panel/room-class-panel.component';
import { SanatoryForBookingPanel } from './main-panel/booking-panel/sanatory-for-booking/sanatory-for-booking.component';
import {
  FaqApproveDialog,
  FaqEditModal,
  FaqPanelComponent,
} from './main-panel/faq-panel/faq-panel/faq-panel.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'san', component: SanPanelComponent },
      { path: 'san/edit/:id', component: SanEditPanelComponent },
      { path: 'org', component: OrgPanelComponent },
      { path: 'org/edit/:id', component: OrgEditPanelComponent },
      { path: 'user', component: UserPanelComponent },
      { path: 'user/edit/:id', component: UserProfileComponent },
      { path: 'booking', component: BookingPanelComponent },
      { path: 'booking/:id', component: BookingPanelComponent },
      { path: 'faq', component: FaqPanelComponent },
      {
        path: 'dict',
        children: [
          { path: 'city/edit', component: CityEditPanelComponent },
          { path: 'comp-cat/edit', component: CompCatEditPanelComponent },
          { path: 'gender/edit', component: GenderEditPanelComponent },
          { path: 'san-type/edit', component: SanTypeEditPanelComponent },
          { path: 'service-cat/edit', component: ServiceCatEditPanelComponent },
          { path: 'room-class/edit', component: RoomClassPanelComponent },
        ],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

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
    ServiceCatEditPanelComponent,
    UserForOrgComponent,
    ApproveDialog,
    BookingPanelComponent,
    RoomForBookingComponent,
    HistoryForBookingComponent,
    RoomClassPanelComponent,
    SanatoryForBookingPanel,
    FaqPanelComponent,
    FaqEditModal,
    FaqApproveDialog,
    OrgApproveDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: false }),
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [RouterModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
