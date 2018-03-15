import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'



import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService} from './services/auth.service';

import {HttpModule} from "@angular/http"
import {UserEventService} from './services/user-event.service'
//routes
import { AppRoutingModule } from './app.routing';
import { UserEventsComponent } from './components/user-events/user-events.component';
import { NewUserEventComponent } from './components/new-user-event/new-user-event.component'

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    UserEventsComponent,
    NewUserEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [AuthService, UserEventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
