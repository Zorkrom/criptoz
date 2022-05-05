import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../../infraestructure/token';
import { CoinService } from '../services/coin.service';

interface Coin {
  id: string
  name: string
  symbol: string
  image: string
  current_price: string
  price_change_percentage_24h: number
  total_volume: string
  favorite: boolean

}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  favorites: Array<string> = []
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
  constructor(private http: HttpClient, private router: Router, private coinService: CoinService) { }

  ngOnInit(): void {
    this.getCoins()
    this.coinService.getFavorites().subscribe((data) => {
      const favoritesCoin = data.payload as Array<string>
      favoritesCoin.forEach((coin: string) => {
        this.favorites.push(coin)
      })
    })
  }
  getCoins() {
    this.http.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .subscribe((res) => {
        this.allCoins = res as Array<Coin>
        this.putThousandCommasPrice()
        this.putThousandCommasVolume()
        this.allCoins.forEach(coin => {
          if (this.favorites.includes(coin.id)) {
            coin.favorite = true
          }
        })
        this.allCoins.sort(function (x, y) {
          return (x.favorite === y.favorite) ? 0 : x.favorite ? -1 : 1;
        })
      })

  }
  putThousandCommasVolume() {
    this.allCoins.forEach(coin => {
      coin.total_volume = new Intl.NumberFormat().format(parseInt(coin.total_volume))
    })
    this.filteredCoins = this.allCoins
  }
  putThousandCommasPrice() {
    this.allCoins.forEach(coin => {
      if (parseFloat(coin.current_price) >= 1) {
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

  saveFavorite(coin: string) {
    if (this.checkFavorite(coin)) {
      const index: number = this.favorites.indexOf(coin)
      this.favorites.splice(index, 1)
    } else {
      this.favorites.push(coin)
    }
    this.coinService.saveFavorites(this.favorites).subscribe(data => {
    })
  }

  private checkFavorite(coin: string): boolean {
    let saveAsFavorite: boolean = false
    this.favorites.forEach((favorite: string) => {
      if (favorite == coin) saveAsFavorite = true
    })
    return saveAsFavorite
  }
  navigate(coinID: string) {
    this.router.navigate(['details/', coinID])
  }

  isLogged() {
    return Token.isValid()
  }
}
