import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coin } from '../../../../shared/coin';

@Component({
  selector: 'app-header-graph',
  templateUrl: './header-graph.component.html',
  styleUrls: ['./header-graph.component.scss']
})
export class HeaderGraphComponent implements OnInit {
  @Input() coin: Coin = {} as Coin
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigate(['list'])
  }
}
