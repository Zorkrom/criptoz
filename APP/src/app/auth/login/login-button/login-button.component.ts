import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../../../../infraestructure/token';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigate(['/list'])
  }
  toLogin() {
    this.router.navigate(['/login'])
  }
  isLogged() {
    return Token.isValid()
  }

  toLogout() {
    this.navigate()
    Token.delete()
  }
}
