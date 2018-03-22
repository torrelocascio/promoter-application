import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { EventService } from "../../services/event.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit {
  logoutError: string;
  eventsListError: string;
  events: Array<Object>=[];
  currentUser: any = {};

  constructor(
    private myAuthService: AuthService,
    private myRouter: Router,
    private myEventService: EventService
  ) {}

  ngOnInit() {
    this.myAuthService.checklogin()
    .then(res => {
      console.log("res is: ===", res)
      this.currentUser = res;
      this.getTheEvents()
    })
    .catch(err => {
      console.log("err is: ", err)
    })
    
  }

  getTheEvents() {
    this.myEventService.getAllEvents()
    .subscribe(allTheEvents => {
      // console.log("allTheUserEvents: ", allTheUserEvents)
        this.events = allTheEvents;
        console.log("userEvents", this.events)
      },
      () => {
        this.eventsListError = "Sorry, no user events.";
      }
    );
  } // close getTheUserEvents()



  logMeOutPls() {
    this.myAuthService
      .logout()
      .then(() => {
        this.myRouter.navigate(["/login"]);
      })
      .catch(() => {
        this.logoutError = "Log out went bad.";
      });
  } // close logMeOutPls()
}