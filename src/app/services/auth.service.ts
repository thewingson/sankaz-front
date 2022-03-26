import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtResponse } from '../model/jwt-response';
import { AuthLoginInfo } from '../model/login-info';
import { SignUpInfo } from '../model/signup-info';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials:true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private loginUrl = environment.hostURL+'/auth/sign-in';
  private signupUrl = environment.hostURL+'/auth/signup';
  private signOutUrl = environment.hostURL+'/auth/sign-out'

  constructor(private http: HttpClient, private storage:TokenStorageService) {
    const token = storage.getToken();
    this._isLoggedIn$.next(!!token);
   }
  
  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions).pipe(
      tap((response:JwtResponse)=>{
        this._isLoggedIn$.next(true);
        this.storage.saveToken(response.accessToken);
        this.storage.saveRefreshToken(response.refreshToken);
        this.storage.saveUserId(response.userId);
      })
    )
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  public isLoggedIn(){
    return !!this.storage.getToken();
  }

  public signOut(){
    return this.http.post(this.signOutUrl,{});
  }

}