import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private baseUrl: string = "http://localhost:3001"


  constructor( private http: HttpClient ) {   }

  getName(): Observable<string> {
    const url:string = this.baseUrl + '/name'
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.get<string>(url, requestOptions);

  }
}
