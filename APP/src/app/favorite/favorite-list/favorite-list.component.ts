import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../../../infraestructure/token';
import { Coin } from '../../../shared/coin';
import { CoinService } from '../../services/coin.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {
  favorites: Array<string> = []
  searchTerm: string = ''
  allCoins: Array<Coin> = []
  favoriteCoins: Array<Coin> = []
  filteredCoins: Array<Coin> = []
  headers: Array<string> = [
    'Nº',
    'Coin',
    'Price',
    'Price Change',
    '24h Volume'
  ]
  constructor(private http: HttpClient, private router: Router, 
              private coinService: CoinService) { }

  ngOnInit(): void {
    if (Token.isValid()) {
      this.coinService.getFavorites().subscribe((data) => {
        const favoritesCoin = data.payload as Array<string>
        favoritesCoin.forEach((coin: string) => {
          this.favorites.push(coin)
        })
        this.getCoins()
      })
    }
  }
  getCoins() {
    this.coinService.getAllCoins().subscribe((res) => {
        this.allCoins = res as Array<Coin>
        this.allCoins.forEach(coin => {
          if (this.favorites.includes(coin.id)) {
            coin.favorite = true
          }
        })
        this.allCoins.sort(function (x, y) {
          return (x.favorite === y.favorite) ? 0 : x.favorite ? -1 : 1;
        })
        this.getFavoriteCoins(this.allCoins)
        this.putThousandCommasPrice()
        this.putThousandCommasVolume()
      })
  }
  getFavoriteCoins(allCoins: Array<Coin>) {
    allCoins.forEach((coin: Coin) => {
      if (coin.favorite) this.favoriteCoins.push(coin)
    })

  }
  putThousandCommasVolume() {
    this.favoriteCoins.forEach(coin => {
      coin.total_volume = new Intl.NumberFormat().format(parseInt(coin.total_volume))
    })
    this.filteredCoins = this.favoriteCoins
  }
  putThousandCommasPrice() {
    this.favoriteCoins.forEach(coin => {
      if (parseFloat(coin.current_price) >= 1) {
        coin.current_price = coin.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    })
  } 
  filterByName(event: string) {
    this.searchTerm = ''
    if (event.length != 0) this.searchTerm = event.toLowerCase()
    this.filterCoins()
  }
  filterCoins() {
    this.filteredCoins = []
    this.favoriteCoins.forEach((coin, index) => {
      if (coin.name.toLowerCase().includes(this.searchTerm)) this.filteredCoins.push(coin)
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
  goList() {
    this.router.navigate(['list'])
  }
}
