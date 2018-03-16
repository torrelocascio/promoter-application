import { Component, OnInit } from '@angular/core';
import { UserEventService } from '../../services/user-event.service';
import { AuthService } from "../../services/auth.service";
import { FileUploader } from "ng2-file-upload";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";


@Component({
  selector: "app-new-user-event",
  templateUrl: "./new-user-event.component.html",
  styleUrls: ["./new-user-event.component.css"]
})
export class NewUserEventComponent implements OnInit {
  userEventData = {
    userEventName: "",
    userEventDescription: ""
  };
  saveError: string;

  myCoolUploader = new FileUploader({
    url: environment.apiBase + "/api/user-events",
    itemAlias: "userEventImage"
  });

  constructor(private myUserEventService: UserEventService, private myAuthService: AuthService, private myRouter: Router) {}

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
  }

  saveNewUserEvent() {
    if (this.myCoolUploader.getNotUploadedItems().length === 0) {
      this.saveUserEventNoImage();
    } else {
      this.saveUserEventWithImage();
    }
  }

  private saveUserEventNoImage() {
    this.myUserEventService
      .createNewUserEvent(this.userEventData)
      .then(newUserEvent => {
        this.userEventData = {
          userEventName: "",
          userEventDescription: ""
        };
        console.log("______", this.userEventData)
        this.saveError = "";
        this.myRouter.navigate(["/user-events"]);
      })
      
      .catch(err => {
        this.saveError = "Well, saving user-event with no image went bad. Sorry!";
      });
  } // close saveUserEventNoImage()

  private saveUserEventWithImage(){
    this.myCoolUploader.onBuildItemForm = (item, form) => {
      console.log("=============================")
      console.log("in onBuildItemForm - item", item);
      console.log("in onBuildItemForm - form", form);
      console.log("=============================");


      form.append("userEventName", this.userEventData.userEventName);
      form.append("userEventDescription", this.userEventData.userEventDescription);
    }
    this.myCoolUploader.onSuccessItem = (item, response) =>{
      console.log("=============================");
      console.log("in onSuccessItem - item", item);
      console.log("in onSuccessItem - response", response);
      console.log("=============================");
      this.userEventData = {
          userEventName: "",
          userEventDescription: ""
        };
        this.saveError = ""
        this.myRouter.navigate(["/user-events"]);
    }
    this.myCoolUploader.onErrorItem = (item, response) => {
      this.saveError = "Saving user-event with image went bad. Sorry!";
    }
    this.myCoolUploader.uploadAll();
  }

}