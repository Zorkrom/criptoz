import { Component, Input, OnInit } from '@angular/core';
import { Coin } from '../../../../shared/coin';

@Component({
  selector: 'app-footer-graph',
  templateUrl: './footer-graph.component.html',
  styleUrls: ['./footer-graph.component.scss']
})
export class FooterGraphComponent implements OnInit {
  @Input() coin: Coin = {} as Coin

  constructor() { }

  ngOnInit(): void {
  }

}
