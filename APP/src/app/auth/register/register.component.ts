import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public username:string = ''
  public password:string = ''
  public confirmPassword:string = ''

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  enterKeyPressed(event: any) {
    if (event.key === "Enter") {
      this.register()
      return true
    }
    return false
  }
  navigate():void{
    this.router.navigate(['/list'])
  }
  
  public register():void{

  }
  public getConfirmPassword(event:Event):string{
    const password = event.target as HTMLInputElement
    const value: string = password.value
    this.confirmPassword = value.trim()
    return this.confirmPassword
  }
  public getPassword(event:Event):string{
    const password = event.target as HTMLInputElement
    const value: string = password.value
    this.password = value.trim()
    return this.password
  }

  public getUsername(event: Event):string {
    const username = event.target as HTMLInputElement
    const value: string = username.value
    this.username = value.trim()
    return this.username
  }

  public showPassword():void {
    const password = document.getElementById("password")!
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  }

  public showConfirmPassword():void {
    const password = document.getElementById("confirmPassword")!
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  }
}
