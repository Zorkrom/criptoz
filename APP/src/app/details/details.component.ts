import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Coin {
  id: string
  name: string
  symbol: string
  links:{
    twitter_screen_name:string
    subreddit_url:string
    homepage:string
  }
  description:{
    en:string
  }
  image: {
    large: string
    small: string
  }
  market_data: {
    current_price: {
      usd:string
    }
    market_cap: {
      usd:string
    }
    high_24h:{
      usd:string
    }
    price_change_24h:number
    circulating_supply:string
    max_supply:string
  }
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  chart = {}
  coinID: string = ''
  coin: Coin = {
    id: "",
    name: "",
    symbol: "",
    links:{
      twitter_screen_name:"",
      subreddit_url:"",
      homepage:""
    },
    description:{
      en:""
    },
    image: {
      large: "",
      small: ""
    },
    market_data: {
      current_price: {
        usd:""
      },
      market_cap:{
        usd:""
      },
      high_24h:{
        usd:""
      },
      price_change_24h:0,
      circulating_supply:"",
      max_supply:""
    }
  }

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.coinID = this.route.snapshot.paramMap.get('id') || 'No hay id'
    this.http.get(`https://api.coingecko.com/api/v3/coins/${this.coinID}`)
      .subscribe(res => {
        this.coin = res as Coin
        this.coin.market_data.market_cap.usd = new Intl.NumberFormat().format(parseInt(this.coin.market_data.market_cap.usd))
        this.coin.market_data.high_24h.usd = "$"+new Intl.NumberFormat().format(parseInt(this.coin.market_data.high_24h.usd))
        this.coin.market_data.circulating_supply = new Intl.NumberFormat().format(parseInt(this.coin.market_data.circulating_supply))+" "+this.coin.symbol.toUpperCase()
        this.coin.market_data.max_supply = new Intl.NumberFormat().format(parseInt(this.coin.market_data.max_supply))
        this.coin.links.homepage = this.coin.links.homepage.toString().split(',')[0]
        this.coin.symbol = "(" + this.coin.symbol + ")"
      })
  }
  
  navigate() {
    this.router.navigate(['list'])
  }

  
}
