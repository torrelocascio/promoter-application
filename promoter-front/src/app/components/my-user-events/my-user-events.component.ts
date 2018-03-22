// Need to swithc all event related names to user-event names

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { UserEventService } from "../../services/user-event.service";
import { EventService } from "../../services/event.service";
import { environment } from "../../../environments/environment";
import { Http } from "@angular/http";

@Component({
  selector: 'app-my-user-events',
  templateUrl: './my-user-events.component.html',
  styleUrls: ['./my-user-events.component.css']
})
export class MyUserEventsComponent implements OnInit {

  userInfo: any;
  userEvents: any;
  userEvents2: any;
  myHttp: Http
  promoterEventsInvited: any;
  constructor( private myAuth: AuthService, 
               private myUserEventService: UserEventService,
               private myRouter: Router) { }

  ngOnInit() {    
    this.myAuth.checklogin()
    .then(res =>{
      this.userInfo = res;
      // this.userEvents2 = this.userInfo.eventCreated;
      // console.log("this.userEvents2", this.userEvents2)
      // console.log("this.userEvents",this.userEvents)
    })
    .catch( err => {
      this.myRouter.navigate(['/login'])
    })
    this.getMeAllUserEvents()
    console.log("this.userEvents2", this.userEvents2)
    }

  getMeAllUserEvents(){
    this.myUserEventService.getAllUserEvents()
    .toPromise()
    .then(res=>{
      this.userEvents2 = res;
      console.log("this.userEvents2", this.userEvents2)
      // console.log("userEvents ============",this.userEvents)
      
      // this.events.forEach(oneElement => {
      //   this.userEventInvited = oneElement.userEventsInvited;
      //   // console.log("===========",this.userEventInvited )

      // });
      console.log("wellll: ", res)
    })

    
  }
  logMeOutPls(){
    this.myAuth.logout()
    .then(() => {
      this.myRouter.navigate(['/login'])
    })
}

sendAccept(userId, userEventId, promoterEventId){
  this.myUserEventService.acceptInvitation(userId, userEventId,promoterEventId)
    .then( res => {
      console.log("in the invite: ", res)
    })
    .catch(err => {
      console.log("err in invite: ", err)
    })
}
}
