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
import { EventService } from "./services/event.service";
import { UserService } from "./services/user.service";

//routes
import { AppRoutingModule  } from './app.routing';
import { UserEventsComponent } from './components/user-events/user-events.component';
import { NewUserEventComponent } from './components/new-user-event/new-user-event.component';

import { UserEventDetailsComponent } from './components/user-event-details/user-event-details.component';

import { FileUploadModule } from "ng2-file-upload";
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { NewVenueComponent } from './components/new-venue/new-venue.component';
import { UserComponent } from './components/user/user.component';
import { EventsComponent } from './components/events/events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { MyUserEventsComponent } from './components/my-user-events/my-user-events.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    UserEventsComponent,
    NewUserEventComponent,
    UserEventDetailsComponent,
    WelcomeComponent,
    EditProfileComponent,
    NewEventComponent,
    NewVenueComponent,
    UserComponent,
    EventsComponent,
    EventDetailsComponent,
    MyEventsComponent,
    MyUserEventsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
  ],
  providers: [AuthService, UserEventService, EventService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }