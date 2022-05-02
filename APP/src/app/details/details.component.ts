import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';

interface Coin {
  id: string
  name: string
  symbol: string
  links: {
    twitter_screen_name: string
    subreddit_url: string
    homepage: string
  }
  description: {
    en: string
  }
  image: {
    large: string
    small: string
  }
  market_data: {
    current_price: {
      usd: string
    }
    market_cap: {
      usd: string
    }
    high_24h: {
      usd: string
    }
    price_change_24h: number
    circulating_supply: string
    max_supply: string
  }
}
interface Prices {
  prices: Array<Array<number>>
}
interface Price {
  price: number,
  date: number
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  chart: Chart = null!
  prices: Array<number> = []
  dates: Array<string> = []
  coinID: string = ''
  coin: Coin = {
    id: "",
    name: "",
    symbol: "",
    links: {
      twitter_screen_name: "",
      subreddit_url: "",
      homepage: ""
    },
    description: {
      en: ""
    },
    image: {
      large: "",
      small: ""
    },
    market_data: {
      current_price: {
        usd: ""
      },
      market_cap: {
        usd: ""
      },
      high_24h: {
        usd: ""
      },
      price_change_24h: 0,
      circulating_supply: "",
      max_supply: ""
    }

  }

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }


  ngOnInit(): void {


    this.coinID = this.route.snapshot.paramMap.get('id') || 'No hay id'
    this.http.get(`https://api.coingecko.com/api/v3/coins/${this.coinID}`)
      .subscribe(res => {
        this.coin = res as Coin
        this.coin.market_data.market_cap.usd = new Intl.NumberFormat().format(parseInt(this.coin.market_data.market_cap.usd))
        this.coin.market_data.high_24h.usd = "$" + new Intl.NumberFormat().format(parseFloat(this.coin.market_data.high_24h.usd))
        this.coin.market_data.circulating_supply = new Intl.NumberFormat().format(parseInt(this.coin.market_data.circulating_supply)) + " " + this.coin.symbol.toUpperCase()
        this.coin.market_data.max_supply = new Intl.NumberFormat().format(parseInt(this.coin.market_data.max_supply))
        this.coin.links.homepage = this.coin.links.homepage.toString().split(',')[0]
        this.coin.symbol = "(" + this.coin.symbol + ")"
      })
    this.getDataLast24h()
  }

  getDataLast24h() {
    this.prices = []
    this.dates = []
    this.http.get(`https://api.coingecko.com/api/v3/coins/${this.coinID}/market_chart?vs_currency=usd&days=1`)
      .subscribe(res => {
        const allPrices = Array.from((res as Prices).prices)
        allPrices.forEach((price: Array<number>) => {
          this.dates.push(new Date(price[0]).getHours() + ":" + getMinutes(price[0]))
          this.prices.push(price[1])
        })
        this.composeChart(13)
        function getMinutes(date: number) {
          const newDate: Date = new Date(date)
          const minutes: string = newDate.getMinutes().toString()
          if (minutes.length < 2) return "0" + minutes
          return minutes
        }
      })
  }
  getDataFromDays(numberDays: number) {
    this.prices = []
    this.dates = []
    this.http.get(`https://api.coingecko.com/api/v3/coins/${this.coinID}/market_chart?vs_currency=usd&days=${numberDays}`)
      .subscribe(res => {
        const allPrices = Array.from((res as Prices).prices)
        allPrices.forEach((price: Array<number>) => {
          this.dates.push(new Date(price[0]).toDateString().substring(0, new Date(price[0]).toDateString().length - 4))
          this.prices.push(price[1])
        })
        this.composeChart(15)
      })
  }

  composeChart(interval: number) {
    let gradient: any;
    function getGradient(ctx: any) {
      if (!gradient) {
        gradient = ctx.createLinearGradient(0, 0, 0, 500);
        gradient.addColorStop(0., "rgba(201,94,94,1)");
        gradient.addColorStop(1, "rgba(27,28,29,1)");
      }

      return gradient;
    }
    if (this.chart) this.chart.destroy()
    this.chart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [{
          data: this.prices,
          borderWidth: 1,
          fill: true,
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              // This case happens on initial chart load
              return;
            }
            return getGradient(ctx);
          },
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          xAxes: {
            ticks: {
              maxTicksLimit: interval
            }
          }
        },
      },
    })



  }

  navigate() {
    this.router.navigate(['list'])
  }


}
