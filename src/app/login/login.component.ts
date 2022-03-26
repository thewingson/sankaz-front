import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FormBuilder, FormGroup} from "@angular/forms";
import {environment} from '../../environments/environment'
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { AuthRes } from '../model/AuthRes';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

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
        AuthInterceptor.accessToken = res.accessToken;
        this.storage.saveToken(res.accessToken);
        this.storage.saveRefreshToken(res.refreshToken)
        this.storage.saveUserId(res.userId)
        this.router.navigate(['/'])
      }
    }
    )
  }

}
