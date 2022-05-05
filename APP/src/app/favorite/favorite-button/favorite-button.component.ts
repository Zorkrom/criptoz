import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../../../infraestructure/token';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  isLogged() {
    return Token.isValid()
  }
  navigate(){
    this.router.navigate(['/list/favorites'])
  }
  
}
