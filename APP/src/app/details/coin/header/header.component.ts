import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coin } from '../../../../shared/coin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() coin: Coin = {} as Coin
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigate(['list'])
  }
}
