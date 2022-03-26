import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accessToken = '';
  constructor(private http:HttpClient,private router:Router,private storage:TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const req = request.clone({
      setHeaders:{
        Authorization: `Bearer ${AuthInterceptor.accessToken}`
      }
    })

    return next.handle(req).pipe(catchError((err:HttpErrorResponse)=>{
      if(err.status === 403){
        AuthInterceptor.accessToken = this.storage.getToken();
        console.log( AuthInterceptor.accessToken);
        return next.handle(request.clone({
          setHeaders:{
            Authorization: `Bearer ${AuthInterceptor.accessToken}`
          }
        }))
      }
      return throwError(()=>err)
    }));
  }
}
