import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Coin{
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  total_volume: number
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  allCoins: Array<Coin> = []
  headers: Array<string> = [
    'Nº',
    'Coin',
    'Price',
    'Price Change',
    '24h Volume'
  ]
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .subscribe((res) => {
        this.allCoins=res as Array<Coin>
      })
    }
}
