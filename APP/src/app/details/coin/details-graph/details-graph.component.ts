import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CoinDetails } from '../../../../shared/coinDetails';
import { Prices } from '../../../../shared/prices';

@Component({
  selector: 'app-details-graph',
  templateUrl: './details-graph.component.html',
  styleUrls: ['./details-graph.component.scss']
})
export class DetailsGraphComponent implements OnInit {
  chart: Chart = null!
  prices: Array<number> = []
  dates: Array<string> = []
  @Input() coin: CoinDetails = {} as CoinDetails
  @Input() coinID: string = ''
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDataLast24h()
  }
  getDataLast24h() {
    this.prices = []
    this.dates = []
    this.http.get(`https://api.coingecko.com/api/v3/coins/${this.coinID}/market_chart?vs_currency=usd&days=1`)
      .subscribe(res => {
        this.saveDataHourFormat(res)
        this.composeChart(13)
      })
  }

  getDataFromDays(numberDays: number) {
    this.prices = []
    this.dates = []
    this.http.get(`https://api.coingecko.com/api/v3/coins/${this.coinID}/market_chart?vs_currency=usd&days=${numberDays}`)
      .subscribe(res => {
        this.saveDataDateFormat(res)
        this.composeChart(15)
      })
  }

  saveDataHourFormat(res: any): void {
    const allPrices = Array.from((res as Prices).prices)
    allPrices.forEach((price: Array<number>) => {
      this.dates.push(new Date(price[0]).getHours() + ":" + getMinutes(price[0]))
      this.prices.push(price[1])
    })
    function getMinutes(date: number) {
      const newDate: Date = new Date(date)
      const minutes: string = newDate.getMinutes().toString()
      if (minutes.length < 2) return "0" + minutes
      return minutes
    }
  }

  saveDataDateFormat(res: any): void {
    const allPrices = Array.from((res as Prices).prices)
    allPrices.forEach((price: Array<number>) => {
      this.dates.push(new Date(price[0]).toDateString().substring(0, new Date(price[0]).toDateString().length - 4))
      this.prices.push(price[1])
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
}
