import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Faq } from '../model/Faq';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
   headers:HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })
  url = environment.hostURL+'/admin/faqs';
  constructor(private http:HttpClient) { }

 public getAll(page:number,size:number){
   return this.http.get(this.url,{headers:this.headers,params:{page:page,size:size}}) 
  }

  public getById(data:Faq){
    return this.http.post(this.url+`/${data.id}`,data,{headers:this.headers})
  }

  public addOne(data:Faq){
    return this.http.post(this.url,data,{headers:this.headers}) 
  }
  public editOne(data:Faq){
    return this.http.put(this.url+`/${data.id}`,data,{headers:this.headers}) 
  }
  public deleteOne(id:string){
    return this.http.delete(this.url+`/${id}`,{headers:this.headers}) 
  }
}
