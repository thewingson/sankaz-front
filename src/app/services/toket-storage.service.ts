import { Injectable } from '@angular/core';

const ACCESS_TOKEN = 'AuthAccessToken';
const REFRESH_TOKEN = 'AuthRefreshToken';
const USER_ID = 'AuthUserId'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut() {
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(ACCESS_TOKEN);
    window.localStorage.setItem(ACCESS_TOKEN, token);
  }

  public getToken(): string {
    return localStorage.getItem(ACCESS_TOKEN);
  }
  
  public saveRefreshToken(refreshToken: string) {
    window.localStorage.removeItem(REFRESH_TOKEN);
    window.localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  public getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  public saveUserId(userId: string) {
    window.localStorage.removeItem(USER_ID);
    window.localStorage.setItem(USER_ID, userId);
  }

  public getUserId(): string {
    return localStorage.getItem(REFRESH_TOKEN);
  }
}