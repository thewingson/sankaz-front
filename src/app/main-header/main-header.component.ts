import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  siteTitle = 'SanKaz';

  user:User;

  constructor(private router:Router, private storage: TokenStorageService,private service:AuthService, private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getById(this.storage.getUserId()).subscribe((res)=>this.user = res['data'])
  }
  
  public logout(){
    this.service.signOut().subscribe((res)=>console.log(res))
    this.storage.signOut();
    this.router.navigate(['/login']);
  }
}
