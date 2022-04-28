import { Component, OnInit } from '@angular/core';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-denomination',
  templateUrl: './denomination.component.html',
  styleUrls: ['./denomination.component.scss']
})
export class DenominationComponent implements OnInit {
  
  public denomination :string = 'No info yet'

  constructor(private infoService: InfoService) { }

  getDenomination(): void {
    this.infoService.getName().subscribe( data => this.denomination = data )
  }
  
  ngOnInit(): void {
    this.getDenomination();
  }
}
