import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { UserEventService } from "../../services/user-event.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-user-events",
  templateUrl: "./user-events.component.html",
  styleUrls: ["./user-events.component.css"]
})
export class UserEventsComponent implements OnInit {
  logoutError: string;
  userEventsListError: string;
  userEvents: Array<Object>=[];
  currentUser: any = {};

  constructor(
    private myAuthService: AuthService,
    private myRouter: Router,
    private myUserEventService: UserEventService
  ) {}

  ngOnInit() {
    this.myAuthService.checklogin()
    .then(res => {
      console.log("res is: ===", res)
      this.currentUser = res;
      this.getTheUserEvents()
    })
    .catch(err => {
      console.log("err is: ", err)
    })
    
  }

  getTheUserEvents() {
    this.myUserEventService.getAllUserEvents()
    .subscribe(allTheUserEvents => {
      // console.log("allTheUserEvents: ", allTheUserEvents)
        this.userEvents = allTheUserEvents;
        console.log("userEvents", this.userEvents)
      },
      () => {
        this.userEventsListError = "Sorry, no user events.";
      }
    );
  } // close getTheUserEvents()



  logMeOutPls() {
    this.myAuthService
      .logout()
      .then(() => {
        this.myRouter.navigate(["/"]);
      })
      .catch(() => {
        this.logoutError = "Log out went bad.";
      });
  } // close logMeOutPls()
}