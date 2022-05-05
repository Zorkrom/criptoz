import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Token } from '../../infraestructure/token';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate, CanLoad {
  
  constructor(private router: Router) { }

  canActivate():boolean{
    return this.canLoad()
  }
  
  canLoad():boolean{
    const isLogged:boolean = Token.isValid()
    if(!isLogged){
      this.router.navigate(['/list'])
      return false
    }
    return true
  }
}