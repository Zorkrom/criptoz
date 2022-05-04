import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../../../infraestructure/token';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @Output() passChanged = new EventEmitter<string>()
  public username:string = ''
  public password:string = ''
  public error: boolean = false
  public errorMessage: string = ''

  constructor(private router:Router, private auth: AuthService) { }

  broadcast(){
  }

  getPassword(event:Event){
    const password = event.target as HTMLInputElement
    const value: string = password.value
    this.password = value.trim()
    return this.password
  }

  getUsername(event: Event) {
    const username = event.target as HTMLInputElement
    const value: string = username.value
    this.username = value.trim()
    return this.username
  }

  enterKeyPressed(event: any) {
    if (event.key === "Enter") {
      this.login()
      return true
    }
    return false
  }

  login(){
    this.auth.getAuth(this.username,this.password)
    .subscribe((data) => {
      console.log("ok: "+data.message)
      if(data.ok){
        Token.set(data.payload!.toString())
        this.router.navigate(['/list'])
      }else{
        this.error=true
        this.errorMessage = data.message!
      }
    })
    
  }
  navigate():void{
    this.router.navigate(['/list'])
  }
}
