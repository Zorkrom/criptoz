import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Coin {
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

  searchTerm: string = ''
  allCoins: Array<Coin> = []
  filteredCoins: Array<Coin> = []
  headers: Array<string> = [
    'Nº',
    'Coin',
    'Price',
    'Price Change',
    '24h Volume'
  ]
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCoins()
    this.allCoins.forEach(coin => {
      coin.total_volume = parseInt(new Intl.NumberFormat().format(coin.total_volume))
    })
    console.log(this.allCoins)
  }

  getCoins() {
    this.http.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .subscribe((res) => {
        
        this.allCoins = res as Array<Coin>
        this.filteredCoins = this.allCoins
      })

    
  }
  filterByName(event: string) {
    this.searchTerm = ''
    if (event.length != 0) this.searchTerm = event
    this.filterCoins()
  }
  filterCoins() {
    this.filteredCoins = []
    this.allCoins.forEach((coin, index) => {
      if (coin.name.includes(this.searchTerm)) this.filteredCoins.push(coin)
    })
  }
}
