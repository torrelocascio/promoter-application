import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {AuthService} from "../../services/auth.service"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private myAuth: AuthService, private myRouter: Router) { }
signUpInfo = {
  username:"",
  password:""
}
errorMessage: string
  ngOnInit() {
  }
doSignUp(){
  this.myAuth.signup(this.signUpInfo)
  .then(resultFromApi => {
    this.signUpInfo = {username: "", password: ""};
//clear error message
this.errorMessage = ""

    //redirect to /user-events
    this.myRouter.navigate(["/user-events"]);
  
  })
  .catch(err=>{
    const parsedError = err.json();
    this.errorMessage = parsedError.message + "Emogi"
  })

}
}
