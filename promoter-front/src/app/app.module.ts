import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";



import { AppComponent } from './app.component';
// services stuff
import { AuthService } from './services/auth.service';
import { SignupComponent } from './components/signup/signup.component'
import { LoginComponent } from "./components/login/login.component";
import { HttpModule } from "@angular/http";
import { UserEventService } from "./services/user-event.service";

//routes
import { AppRoutingModule  } from './app.routing';
import { UserEventsComponent } from './components/user-events/user-events.component';
import { NewUserEventComponent } from './components/new-user-event/new-user-event.component';

import { UserEventDetailsComponent } from './components/user-event-details/user-event-details.component';

import { FileUploadModule } from "ng2-file-upload";
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    UserEventsComponent,
    NewUserEventComponent,
    UserEventDetailsComponent,
    WelcomeComponent,
    EditProfileComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
  ],
  providers: [AuthService, UserEventService],
  bootstrap: [AppComponent]
})
export class AppModule { }