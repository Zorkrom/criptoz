import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Coin {
  id: string
  name: string
  symbol: string
  image: {
    large:string
    small:string
  }
  current_price: string
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  coinID: string = ''
  coin:Coin = {
    id: "",
  name: "",
  symbol: "",
  image: {
    large:"",
    small:""
  },
  current_price: ""
  }
  

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.coinID = this.route.snapshot.paramMap.get('id') || 'No hay id'
    this.http.get(`https://api.coingecko.com/api/v3/coins/${this.coinID}`)
    .subscribe(res=>{
      this.coin = res as Coin
      this.coin.symbol="("+this.coin.symbol+")"
    console.log(this.coin)

    })
  }

}
