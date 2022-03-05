import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DictEnity } from '../model/DictEntity';

@Injectable({
  providedIn: 'root'
})
export class ServCatService {
   headers:HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  }).set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`
  )
  url = environment.hostURL+'/admin/dict/ser-cat';
  constructor(private http:HttpClient) { }


 public getAll(){
   return this.http.get(this.url,{headers:this.headers}) 
  }

  public setById(data:DictEnity){
    return this.http.post(this.url+`/${data.id}`,data,{headers:this.headers})
  }

  public addOne(data:DictEnity){
    return this.http.post(this.url,data,{headers:this.headers}) 
  }
  public deleteOneById(data:DictEnity){
    return this.http.delete(this.url+`/${data.id}`,{headers:this.headers}) 
  }
}
