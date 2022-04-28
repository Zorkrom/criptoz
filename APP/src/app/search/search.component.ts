import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }
  @Output() onChange = new EventEmitter()
  searchTerm:string = ''

  ngOnInit(): void {
  }

  search(){
    this.onChange.emit(this.searchTerm)  
  }
}
