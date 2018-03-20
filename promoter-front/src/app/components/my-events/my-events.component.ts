import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { UserEventService } from "../../services/user-event.service";
import { EventService } from "../../services/event.service";
import { environment } from "../../../environments/environment";
import { Http } from "@angular/http";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  userInfo: any;
  events: any;
  promoterEvents: any;
  myHttp: Http

  constructor( private myAuth: AuthService, private myEventService: EventService) { }

  ngOnInit() {    
    this.myAuth.checklogin()
    .then(res =>{
      this.userInfo = res;
      this.promoterEvents = this.userInfo.eventCreated;
      console.log("promo events:", this.promoterEvents)
    })
    this.getMeAllEvents()
  }

  getMeAllEvents(){
    this.myEventService.getAllEvents()
    .toPromise()
    .then(res=>{
      this.events = res;
      console.log("wellll: ", res)
    })
  }

}
