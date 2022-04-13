import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DictEntity } from '../model/DictEntity';

@Injectable({
  providedIn: 'root'
})
export class RoomClassService {
   headers:HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })
  url = environment.hostURL+'/admin/dict/room-class-dics';
  constructor(private http:HttpClient) { }


 public getAll(){
   return this.http.get(this.url,{headers:this.headers}) 
  }

  public setById(data:DictEntity){
    return this.http.post(this.url+`/${data.id}`,data,{headers:this.headers})
  }

  public addOne(data:DictEntity){
    return this.http.post(this.url,data,{headers:this.headers}) 
  }
  public deleteOneById(id:string){
    return this.http.delete(this.url+`/${id}`,{headers:this.headers}) 
  }
}
