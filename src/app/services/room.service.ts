import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sanatory } from '../model/Sanatory';

type RoomFilter = {
  sanId?:string,
  telNumber?:string,
  startDate?:string,
  endDate?:string,
  minPrice?:string,
  maxPrice?:string,
  page?:number,
  size?:number,
  status?:string
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
   headers:HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })
  url = environment.hostURL+'/admin/rooms';
  constructor(private http:HttpClient) { }


 public getAll(){
   return this.http.get(this.url,{headers:this.headers}) 
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
