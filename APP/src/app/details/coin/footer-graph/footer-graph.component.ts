import { Component, Input, OnInit } from '@angular/core';
import { CoinDetails } from '../../../../shared/coinDetails';

@Component({
  selector: 'app-footer-graph',
  templateUrl: './footer-graph.component.html',
  styleUrls: ['./footer-graph.component.scss']
})
export class FooterGraphComponent implements OnInit {
  @Input() coin: CoinDetails = {} as CoinDetails

  constructor() { }

  ngOnInit(): void {
  }

}
