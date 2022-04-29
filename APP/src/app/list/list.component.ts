import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Coin {
  id: string
  name: string
  symbol: string
  image: string
  current_price: string
  price_change_percentage_24h: number
  total_volume: string
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
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getCoins()
  }

  getCoins() {
    this.http.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .subscribe((res) => {
        this.allCoins = res as Array<Coin>
        this.putThousandCommasPrice()
        this.putThousandCommasVolume()
      })


  }
  putThousandCommasVolume(){
    this.allCoins.forEach(coin => {
      coin.total_volume = new Intl.NumberFormat().format(parseInt(coin.total_volume))
    })
    this.filteredCoins = this.allCoins
  }
  putThousandCommasPrice(){
    this.allCoins.forEach(coin => {
      if(parseFloat(coin.current_price)>=1){
      coin.current_price = coin.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
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
  navigate(coinID:string){
    this.router.navigate(['details/',coinID])
  }
}
