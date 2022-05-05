import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoinDetails } from '../../../../shared/coinDetails';

@Component({
  selector: 'app-header-graph',
  templateUrl: './header-graph.component.html',
  styleUrls: ['./header-graph.component.scss']
})
export class HeaderGraphComponent implements OnInit {
  @Input() coin: CoinDetails = {} as CoinDetails
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigate(['list'])
  }
}
