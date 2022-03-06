import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   headers:HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  }).set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`
  )
  url = environment.hostURL+'/admin/users';
  constructor(private http:HttpClient) { }


 public getAll(){
   return this.http.get(this.url,{headers:this.headers}) 
  }

  public getById(id:string){
    return this.http.get(this.url+`/${id}`,{headers:this.headers})
  }

  public setById(data:User){  
    return this.http.put(this.url+`/${data.id}`,data,{headers:this.headers})
  }

  public addOne(data:User){
    return this.http.post(this.url,data,{headers:this.headers}) 
  }
  public deleteOneById(id:string){
    return this.http.delete(this.url+`/${id}`,{headers:this.headers}) 
  }
}
