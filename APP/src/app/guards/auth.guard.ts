import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Token } from '../../infraestructure/token';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
  constructor(private router: Router) { }

  canActivate():boolean{
    return this.canLoad()
  }
  
  canLoad():boolean{
    const isLogged:boolean = Token.isValid()
    if(isLogged){
      this.router.navigate(['/list'])
      return false
    }
    return true
  }
}
