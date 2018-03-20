import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { environment } from "../../../environments/environment";

import "rxjs/add/operator/toPromise";

@Component({
  selector: "edit-profile-details",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent implements OnInit {
  user = <any>{};

  public updatedProfile: Object = {};
  public username: String;
  public description: String;
  public profileImage: String;

  // userData = {
  //   username:"",
  //   description:"",
  //   userImage:""
  // }
  saveError = "";

  baseUrl = environment.apiBase;

  constructor(
    private myUserService: UserService,
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
      this.getUserDetails(params["id"]);
    });
  }
  // getting one phone and its details
  getUserDetails(id) {
    this.myUserService.getId(id).then(theUserDetails => {
      this.user = theUserDetails;
    });
  }

  doTheUpdate(id, formData) {
    // console.log("=============== id: ", id);
    const formInfo = formData.form.controls;
    console.log("=============== formData: ", formInfo.username);
    this.username = formInfo.username.value;
    this.description = formInfo.description.value;
    console.log("========", this.description)
    // this.userImage = formInfo.phoneColor.value;
    this.sendUpdatesToApi(id);
  }

  sendUpdatesToApi(id){
    this.updatedProfile = { username: this.user.username, description: this.user.description};
    console.log("updates:", this.updatedProfile)
    this.myUserService.updateMyProfile(id, this.updatedProfile)
      .toPromise()
      .then(()=>{
        this.myRouter.navigate(['/user-events'])
      })
      .catch()
  }






}