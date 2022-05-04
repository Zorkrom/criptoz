import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Result } from '../../shared/result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public getAuth(username:string, password:string): Observable<Result> {
    const url: string = environment.baseUrl + '/login'

    const requestOptions: Object = {
      username: username,
      password: password
    }
    return this.http.post<Result>(url,requestOptions)
  }
  public register(username:string,password:String): Observable<Result>{
    const url: string = environment.baseUrl + '/login/register'

    const requestOptions: Object = {
      username: username,
      password: password
    }
    return this.http.post<Result>(url,requestOptions)
  }
}

