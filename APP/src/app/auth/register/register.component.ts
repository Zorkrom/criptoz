import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../../../infraestructure/token';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private username:string = ''
  private password:string = ''
  private confirmPassword:string = ''
  public error:boolean = false
  public errorMessage = ''

  constructor(private router:Router,private auth:AuthService) { }

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
    if(!this.checkUser()&&!this.isWrongPassword()){
      this.auth.register(this.username,this.password)
      .subscribe((data)=>{
        if(!data.ok){
          this.error=true
          this.errorMessage=data.message!
        }
        if(data.ok){
          Token.set(data.payload!.toString())
          this.router.navigate(['/list'])
        }
      })
      
    }
    if(this.checkUser()){
      this.error = true
      this.errorMessage = "Username is required"
    }
    if(this.isWrongPassword()){
      this.error = true
      this.errorMessage = "Passwords does not match"
    }

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
  private checkUser():boolean{
    return this.isBlank(this.username)
  }
  private isBlank(data:string):boolean{
    return data == ''
  }
  private isWrongPassword():boolean{
    return (this.passwordsAreDifferent() || this.passwordNotBlank())
  }
  private passwordsAreDifferent():boolean{
    if(this.password != this.confirmPassword)return true
    return false
  }
  private passwordNotBlank():boolean{
    if(!this.isBlank(this.password) || !this.isBlank(this.confirmPassword))return false
    return true
  }
}
