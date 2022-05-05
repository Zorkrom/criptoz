import { Component, OnInit } from '@angular/core';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-denomination',
  templateUrl: './denomination.component.html',
  styleUrls: ['./denomination.component.scss']
})
export class DenominationComponent implements OnInit {
  
  public denomination :string = 'CriptoZ'

  constructor(private infoService: InfoService) { }

  
  ngOnInit(): void {
  }
}
