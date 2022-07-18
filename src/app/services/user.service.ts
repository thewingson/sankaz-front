import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';
import CyrillicToTranslit from 'cyrillic-to-translit-js';


@Injectable({
  providedIn: 'root'
})
export class UserService {
   headers:HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })
  url = environment.hostURL+'/admin/users';
  constructor(private http:HttpClient) { }


 public getAll(pageNumber?,offset?){
  
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",pageNumber).append("size",offset);
    return this.http.get(this.url,{headers:this.headers,params:queryParams});
    
  }

  public getAllForOrg(page?,size?,fullName?,telNumber?){
    const url = this.url+'/for-org'
    const headers:HttpHeaders = new HttpHeaders({
    }).set('Authorization', `Bearer ${localStorage.getItem('AuthAccessToken')}`
    )
      let formData = new FormData();
       formData.append("page",page?page:0)
       formData.append("size",size?size:0)
       formData.append("fullName",fullName?fullName:'')
       formData.append("telNumber",telNumber?telNumber:'')
       formData.forEach(d=>console.log(d))
      return this.http.post(url,formData,{headers:headers});
   
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

  public uploadImage(data:User,image:File){
    const cyrillicToTranslit = new CyrillicToTranslit();
    const headers:HttpHeaders = new HttpHeaders({
    }).set('Authorization', `Bearer ${localStorage.getItem('AuthAccessToken')}`
    )
    const formData = new FormData();
    console.log(image)
    formData.append('pic',image,cyrillicToTranslit.transform(image.name,'_'))
    debugger
    return this.http.put(this.url+`/${data.id}/pics`,formData,{headers:headers})
  }
}
