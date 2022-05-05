import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Token } from '../../infraestructure/token';
import { Result } from '../../shared/result';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  constructor(private http: HttpClient) { }

  public getFavorites(): Observable<Result> {
    const url: string = environment.baseUrl + '/coin/getFavorites'
    const username:string = Token.getUsername()
    const requestOptions: Object = {
      username:username
    }
    return this.http.post<Result>(url,requestOptions)
  }
  public saveFavorites(favorites:Array<string>): Observable<Result> {
    const url: string = environment.baseUrl + '/coin/saveFavorites'
    const username:string = Token.getUsername()
    const requestOptions: Object = {
      username:username,
      favorites:favorites
    }
    return this.http.post<Result>(url,requestOptions)
  }
}
