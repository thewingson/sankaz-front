import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sanatory } from '../model/Sanatory';

type BookingFilter = {
  sanId?: string;
  telNumber?: string;
  startDate?: string;
  endDate?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: number;
  size?: number;
  status?: string;
};

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  url = environment.hostURL + '/admin/books/filter';
  constructor(private http: HttpClient) {}

  public getAll(filter: BookingFilter) {
    const fields = [
      'sanId',
      'telNumber',
      'status',
      'startDate',
      'endDate',
      'minPrice',
      'maxPrice',
      'page',
      'size',
    ];
    const formData = new FormData();
    fields.forEach((el) => {
      formData.append(el, '');
    });
    const headers = new HttpHeaders({}).set(
      'Authorization',
      `Bearer ${localStorage.getItem('AuthAccessToken')}`
    );
    for (const [key, value] of Object.entries(filter)) {
      formData.set(key, value ? value.toString() : '');
    }
    return this.http.post(this.url, formData, { headers: headers });
  }

  public getById(id: string) {
    return this.http.get(this.url + `/${id}`, { headers: this.headers });
  }

  public setById(data: Sanatory) {
    return this.http.post(this.url + `/${data.id}`, data, {
      headers: this.headers,
    });
  }

  public addOne(data: Sanatory) {
    return this.http.post(this.url, data, { headers: this.headers });
  }
  public deleteOneById(id: string) {
    return this.http.delete(this.url + `/${id}`, { headers: this.headers });
  }

  public getBookingHistoryById(id: string) {
    return this.http.get(environment.hostURL + `/admin/books/${id}/history`, {
      headers: this.headers,
    });
  }
}
