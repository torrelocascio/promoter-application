import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { UserEventService } from "../../services/user-event.service";
import { environment } from "../../../environments/environment";

import "rxjs/add/operator/toPromise";

@Component({
  selector: 'app-user-event-details',
  templateUrl: './user-event-details.component.html',
  styleUrls: ['./user-event-details.component.css']
})
export class UserEventDetailsComponent implements OnInit {
  userEvent = <any>{};

  public updatedUserEvent: Object = {};
  public userEventName: String;
  public userEventBrand: String;
  public userEventColor: String;

  // userEventData = {
  //   userEventBrand:"",
  //   userEventName:"",
  //   userEventColor:"",
  //   phoneImage:""
  // }
  saveError = "";

  baseUrl = environment.apiBase;

  constructor(
    private myUserEventService: UserEventService,
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
      this.getUserEventDetails(params["id"]);
    });
  }
  // getting one phone and its details
  getUserEventDetails(id) {
    this.myUserEventService.getId(id).then(theUserEventDetails => {
      this.userEvent = theUserEventDetails;
    });
  }

  doTheUpdate(id, formData) {
    // console.log("=============== id: ", id);
    const formInfo = formData.form.controls;
    console.log("=============== formData: ", formInfo.userEventName);
    this.userEventName = formInfo.userEventName.value;
    this.sendUpdatesToApi(id);
  }

  sendUpdatesToApi(id){
    this.updatedUserEvent = { userEventBrand: this.userEvent.brand, userEventName: this.userEvent.name, phoneColor: this.userEvent.color };
    console.log("updates:", this.updatedUserEvent)
    this.myUserEventService.updateUserEvent(id, this.updatedUserEvent)
      .toPromise()
      .then(()=>{
        this.myRouter.navigate(['/user-events'])
      })
      .catch()
  }

  deleteThisUserEvent(){
    if (!confirm("Are you sure?")) {
      return;
    }
    this.myUserEventService
      .deleteUserEvent(this.userEvent._id)
      .then(() => {
        console.log("Success");
        this.myRouter.navigate(["/user-events"]);
      })
      .catch(err => {
        alert("Sorry! Something went wrong.");
        console.log("UserEvent Delete Error");
        console.log(err);
      });
  }




}
