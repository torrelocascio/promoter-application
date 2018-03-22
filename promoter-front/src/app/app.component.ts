import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { environment } from "../environments/environment";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: any = {};

  constructor(
    private myAuthService: AuthService,
    private myRouter: Router
  ) {}

  ngOnInit() {
    this.myAuthService.checklogin()
    .then(res => {
      console.log("res is: ===", res)
      this.currentUser = res;
    })
    .catch(err => {
      console.log("err is: ", err)
    })
    
  }
}