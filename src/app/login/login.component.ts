import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FormBuilder, FormGroup} from "@angular/forms";
import {environment} from '../../environments/environment'
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { AuthRes } from '../model/AuthRes';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/toket-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  constructor(@Inject(DOCUMENT)
              private document: Document,
              private formBuilder:FormBuilder,
              private router:Router,
              private service:AuthService,
              private storage:TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.document.body.classList.add('login');
    this.form = this.formBuilder.group({
      username:'',
      password:''
    })
  }
  submit():void{
    this.service.attemptAuth(this.form.getRawValue()).subscribe({
      next:(res)=>{
        console.log(res);
        this.storage.saveToken(res.accessToken);
        this.storage.saveRefreshToken(res.refreshToken)
        this.storage.saveUserId(res.userId)
        this.router.navigate(['/'])
      }
    }
    )
    //  this.http.post(environment.hostURL+"/auth/sign-in", this.form.getRawValue(),
    //  {withCredentials:true})
    //    .subscribe((data:AuthRes)=>{
    //     localStorage.setItem('accessToken', data.accessToken);
    //     localStorage.setItem('refreshToken',data.refreshToken);
    //    this.router.navigate(['/'])
    //    }
    // );
    
  }

}
