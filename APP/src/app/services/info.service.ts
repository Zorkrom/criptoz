import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoService {


  constructor( private http: HttpClient ) {   }

  getName(): Observable<string> {
    const url:string = environment.baseUrl + '/name'
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.get<string>(url, requestOptions)

  }
}
