import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { UserEventService } from "../../services/user-event.service";
import { EventService } from "../../services/event.service";
import { environment } from "../../../environments/environment";
import { Http } from "@angular/http";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userInfo: any;
  ispromoter: String;
  userId: String;
  myHttp: Http
  myEventService: EventService

  constructor( private myAuth: AuthService ) { }

  ngOnInit() {
    // this.checkRole()
    // console.log("This.UserInfo+=============",this.userInfo)
    // this.ispromoter=this.userInfo.ispromoter
    // this.userId= this.userInfo._id
    
    this.myAuth.checklogin()
    .then(res =>{
      this.userInfo = res;
      console.log(this.userInfo)
    })
    
  }

  // checkRole() {
  //   return
  //     this.myHttp
  //       .get(
    //       `${environment.apiBase}/api/checkrole`,

    //       // Send the cookies across domains
    //       { withCredentials: true }
    //     )

    //     // Convert from observable to promise
    //     .toPromise()

    //     // Parse the JSON
    //     .then(res => 
    //       this.userInfo=res.json())
    // } // close checklogin()

    // checklogin() {
    // return (
    //   this.myHttp
    //     .get(
  //         `${environment.apiBase}/api/checklogin`,

  //         // Send the cookies across domains
  //         { withCredentials: true }
  //       )

  //       // Convert from observable to promise
  //       .toPromise()

  //       // Parse the JSON
  //       .then(res => res.json())
  //   );
  // } // close checklogin()


}
