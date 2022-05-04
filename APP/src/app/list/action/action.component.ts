import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  @Input() coinID: string = ''
  checked:boolean = false
  image:string
  private emptyStar:string="../../../assets/star.svg"
  private fullStar:string="../../../assets/star-fill.svg"

  constructor() { 
    this.image=this.emptyStar
  }

  ngOnInit(): void {
  }
  favorite(){
    console.log(this.coinID)
    this.isChecked()
    console.log(this.checked)
  }
  isChecked(){
    if(this.checked){
      this.checked=false
      this.image=this.emptyStar
    }else{
      this.checked=true
      this.image=this.fullStar
    }
  }
}
