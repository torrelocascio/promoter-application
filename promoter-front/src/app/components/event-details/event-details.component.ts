import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { EventService } from "../../services/event.service";
import { environment } from "../../../environments/environment";

import "rxjs/add/operator/toPromise";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event = <any>{};

  public updatedEvent: Object = {};
  public eventName: String;
  public eventDescription: String


  // userEventData = {
  //   userEventBrand:"",
  //   userEventName:"",
  //   userEventColor:"",
  //   phoneImage:""
  // }
  saveError = "";

  baseUrl = environment.apiBase;

  constructor(
    private myEventService: EventService,
    private myAuthService: AuthService,
    private myRoute: ActivatedRoute,
    private myRouter: Router
  ) {}

  ngOnInit() {
    this.myAuthService
      .checklogin()
      // If success, we are logged in.
      .then()

      // Even if you don't do anything on error, catch to avoid a console error.
      .catch(err => {
        console.log(err);
        this.myRouter.navigate(["/"]);
      });
    this.myRoute.params.subscribe(params => {
      this.getEventDetails(params["id"]);
    });
  }
  // getting one phone and its details
  getEventDetails(id) {
    this.myEventService.getId(id).then(theEventDetails => {
      this.event = theEventDetails;
    });
  }

  doTheUpdate(id, formData) {
    // console.log("=============== id: ", id);
    const formInfo = formData.form.controls;
    console.log("=============== formData: ", formInfo.eventName);
    this.eventName = formInfo.eventName.value;
    this.sendUpdatesToApi(id);
  }

  sendUpdatesToApi(id){
    this.updatedEvent = { eventDescription: this.event.description, eventName: this.event.name };
    console.log("updates:", this.updatedEvent)
    this.myEventService.updateEvent(id, this.updatedEvent)
      .toPromise()
      .then(()=>{
        this.myRouter.navigate(['/user-events'])
      })
      .catch()
  }

  deleteThisEvent(){
    if (!confirm("Are you sure?")) {
      return;
    }
    this.myEventService
      .deleteEvent(this.event._id)
      .then(() => {
        console.log("Success");
        this.myRouter.navigate(["/events"]);
      })
      .catch(err => {
        alert("Sorry! Something went wrong.");
        console.log("Event Delete Error");
        console.log(err);
      });
  }




}