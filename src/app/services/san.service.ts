import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sanatory } from '../model/Sanatory';

type Filter = {
cityId?: string,
name?: string,
sanTypeCode?: string,
startDate?: string,
endDate?: string,
adults?: number,
children?: number,
page?: number,
size?: number,
}

@Injectable({
  providedIn: 'root'
})
export class SanService {
   headers:HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })
  url = environment.hostURL+'/admin/sans';
  constructor(private http:HttpClient) { }


 public getAll(filter:Filter){
   const fields = ['cityId','name','sanTypeCode','startDate','endDate','adults','children','page','size'];
   const formData = new FormData();
   const headers = new HttpHeaders({}).set('Authorization', `Bearer ${localStorage.getItem('AuthAccessToken')}`)
   fields.forEach(key => {
     formData.append(key,'')
   });
   for (const [key,value] of Object.entries(filter)){
     formData.set(key,value?value.toString():'');
   }
   if(!formData.get('page')){
     formData.set('page','0')
   }

   return this.http.post(this.url,formData,{headers:headers}) 
  }

  public getById(id:string){
    return this.http.get(this.url+`/${id}`,{headers:this.headers})
  }

  public setById(data:Sanatory){
    return this.http.post(this.url+`/${data.id}`,data,{headers:this.headers})
  }

  public addOne(data:Sanatory){
    return this.http.post(this.url,data,{headers:this.headers}) 
  }
  public deleteOneById(id:string){
    return this.http.delete(this.url+`/${id}`,{headers:this.headers}) 
  }
}
