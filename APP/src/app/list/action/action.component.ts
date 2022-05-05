import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  @Input() coinID: string = ''
  @Input() favoriteCoins:Array<string> = []
  @Output() emitFavorite = new EventEmitter()

  favorites:Array<string> = []
  image:string
  private emptyStar:string="../../../assets/star.svg"
  private fullStar:string="../../../assets/star-fill.svg"

  constructor() { 
    this.image=this.emptyStar
  }

  ngOnInit(): void {
    if(this.favoriteCoins.includes(this.coinID)) this.image=this.fullStar
  }
  public favorite(){
    this.isChecked()
    this.addFavorite()
  }
  addFavorite(){
    this.emitFavorite.emit(this.coinID)
  }
  public getFavorites(){
  }
  public isChecked(){
    if(this.favoriteCoins.includes(this.coinID)){
      this.image=this.emptyStar
    }else{
      this.image=this.fullStar
    }

  }
}
