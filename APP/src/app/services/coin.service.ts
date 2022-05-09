import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Token } from '../../infraestructure/token';
import { Coin } from '../../shared/coin';
import { Result } from '../../shared/result';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  allCoins: Array<Coin> = []
  filteredCoins: Array<Coin> = []
  favorites: Array<string> = []


  constructor(private http: HttpClient) { }

  public getAllCoins() {
    return this.http.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
  }

  public getCoin(id: string) {
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${id}`)
  }

  public getFavorites(): Observable<Result> {
    const url: string = environment.baseUrl + '/coin/getFavorites'
    const username: string = Token.getUsername()
    const requestOptions: Object = {
      username: username
    }
    return this.http.post<Result>(url, requestOptions)
  }

  public saveFavorites(favorites: Array<string>): Observable<Result> {
    const url: string = environment.baseUrl + '/coin/saveFavorites'
    const username: string = Token.getUsername()
    const requestOptions: Object = {
      username: username,
      favorites: favorites
    }
    return this.http.post<Result>(url, requestOptions)
  }
}
