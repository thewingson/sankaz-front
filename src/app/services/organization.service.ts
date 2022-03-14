import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Organization } from '../model/Organization';

export interface OrgFormData{
    name?:string,
    companyName?:string,
    address?:string,
    companyCategoryCode?:string,
    confirmationStatus?:string,
    page?:string,
    size?:string
}

@Injectable({
  providedIn: 'root'
})

export class OrgService {
   headers:HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  }).set('Authorization', `Bearer ${localStorage.getItem('AuthAccessToken')}`
  )
  url = environment.hostURL+'/admin/orgs';
  constructor(private http:HttpClient) { }


 public getAll(params:OrgFormData){
    let queryParams = new HttpParams();
    Object.keys(params).forEach(key => {
        queryParams.append(key,params[key])
    });
    
 return  this.http.get(this.url,{headers:this.headers,params:queryParams});
  }

  public getById(id:string){
    return this.http.get(this.url+`/${id}`,{headers:this.headers})
  }

  public setById(data:Organization){  
    return this.http.put(this.url+`/${data.id}`,data,{headers:this.headers})
  }

  public addOne(data:Organization){
    return this.http.post(this.url,{...data, "confirmationStatus":"NEW"},{headers:this.headers}) 
  }

  public deleteOneById(id:string){
    return this.http.delete(this.url+`/${id}`,{headers:this.headers}) 
  }

  public addPics(data:Organization,images:File[]){
    const headers:HttpHeaders = new HttpHeaders({
    }).set('Authorization', `Bearer ${localStorage.getItem('AuthAccessToken')}`
    )
    const formData = new FormData();
    images.forEach((file,i)=>{
      formData.append(`pics`,file,file.name)
    })
    return this.http.put(this.url+`/${data.id}/pics`,formData,{headers:headers})
  }

  public approveOrg(id:string){
    return this.http.post(this.url+`/${id}/approve`,{},{headers:this.headers})
  }

  public rejectOrg(id:string,rejectionMessage:string){
    return this.http.post(this.url+`/${id}/reject`,{rejectMessage:rejectionMessage},{headers:this.headers})
  }
}
