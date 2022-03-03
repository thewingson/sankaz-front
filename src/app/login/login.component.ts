import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FormBuilder, FormGroup} from "@angular/forms";
import {environment} from '../../environments/environment'
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

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
              private http: HttpClient,
              private router:Router
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
    console.log(this.form.getRawValue())
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'http://185.146.1.64:8098/auth/sign-in'
      }),
      withCredentials: true,
    };
     this.http.post(environment.hostURL+"/auth/sign-in", JSON.stringify(this.form.getRawValue()),httpOptions)
       .subscribe({
         next:()=>{
           alert('login successful');
         },
         error:(error)=>{
           alert('login failed')
         }
       }
         
      
    );
  //   fetch('http://185.146.1.64:8098/auth/sign-in', {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(this.form.getRawValue()),
  //   mode:'no-cors'
  // }).then(res=>console.log(res.body));
  }

}
