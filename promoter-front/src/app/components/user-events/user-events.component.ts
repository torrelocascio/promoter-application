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
    this.myAuthService
      .checklogin()
      // If success, we are logged in.
      .then(resultFromApi => {
        this.currentUser = resultFromApi;
        console.log("user is: ", this.currentUser);
        this.getTheUserEvents()
      })

      // Even if you don't do anything on error, catch to avoid a console error.
      .catch(err => {
        console.log(err);
        this.myRouter.navigate(["/"]);
      });
    // this.getTheUserEvents();
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