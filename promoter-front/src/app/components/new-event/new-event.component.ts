import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { AuthService } from "../../services/auth.service";
import { FileUploader } from "ng2-file-upload";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";


@Component({
  selector: "app-new-event",
  templateUrl: "./new-event.component.html",
  styleUrls: ["./new-event.component.css"]
})
export class NewEventComponent implements OnInit {
  eventData = {
    eventName: "",
    eventDescription: ""
  };
  saveError: string;
  userInSession= <any>{};

  myCoolUploader = new FileUploader({
    url: environment.apiBase + "/api/user-events",
    itemAlias: "userEventImage"
  });

  constructor(private myEventService: EventService, private myAuthService: AuthService, private myRouter: Router) {}

  ngOnInit() {
     this.myAuthService
       .checklogin()
       // If success, we are logged in.
       .then( res=>{
         this.userInSession = res;
       }  )

       // Even if you don't do anything on error, catch to avoid a console error.
       .catch(err => {
         console.log(err);
         this.myRouter.navigate(["/"]);
       });
  }

  saveNewEvent() {
    if (this.myCoolUploader.getNotUploadedItems().length === 0) {
      this.saveEventNoImage();
    } else {
      this.saveEventWithImage();
    }
  }

  private saveEventNoImage() {
    this.myEventService
      .createNewEvent(this.eventData)
      .then(newEvent => {
        this.eventData = {
          eventName: "",
          eventDescription: ""
        };
        // console.log("______", this.eventData)
        this.saveError = "";
        // ['/users',userInfo._id,'events']
        this.myRouter.navigate(["/users", this.userInSession._id,"events"]);
      })
      
      .catch(err => {
        this.saveError = "Well, saving vent with no image went bad. Sorry!";
      });
  } // close saveUserEventNoImage()

  private saveEventWithImage(){
    this.myCoolUploader.onBuildItemForm = (item, form) => {
      console.log("=============================")
      console.log("in onBuildItemForm - item", item);
      console.log("in onBuildItemForm - form", form);
      console.log("=============================");


      form.append("userEventName", this.eventData.eventName);
      form.append("userEventDescription", this.eventData.eventDescription);
    }
    this.myCoolUploader.onSuccessItem = (item, response) =>{
      console.log("=============================");
      console.log("in onSuccessItem - item", item);
      console.log("in onSuccessItem - response", response);
      console.log("=============================");
      this.eventData = {
          eventName: "",
          eventDescription: ""
        };
        this.saveError = ""
        this.myRouter.navigate(["/events"]);
    }
    this.myCoolUploader.onErrorItem = (item, response) => {
      this.saveError = "Saving user-event with image went bad. Sorry!";
    }
    this.myCoolUploader.uploadAll();
  }

}