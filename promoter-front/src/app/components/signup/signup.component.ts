import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {

  constructor(private myAuth: AuthService, private myRouter: Router) {}
  signedInUser = <any>{};
  errorMessage:String;
  signUpInfo={
    username:"",
    password:"",
    ispromoter: false
  }
  ngOnInit() {}

  doSignUp() {
    console.log(this.signUpInfo);
    this.myAuth
      .signup(this.signUpInfo)
      .then(resultFromApi => {
        this.signedInUser = resultFromApi;

        // redirect to /user-events
        this.myRouter.navigate(["/users", this.signedInUser._id]);
        // clear form
        this.signUpInfo = { username: "", password: "", ispromoter:false };

        // clear error message
        this.errorMessage = "";

        
      })
      .catch(err => {
        const parsedError = err.json();
        this.errorMessage = parsedError.message + " 😤";
      });
  } // close doSignUp()
}