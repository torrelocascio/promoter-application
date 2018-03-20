import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";
import { UserEventsComponent } from "./components/user-events/user-events.component";
import { UserEventDetailsComponent } from "./components/user-event-details/user-event-details.component";
import { NewUserEventComponent } from "./components/new-user-event/new-user-event.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { NewEventComponent } from "./components/new-event/new-event.component";
import { EventsComponent } from "./components/events/events.component";
import { UserComponent } from "./components/user/user.component";
import { MyEventsComponent } from "./components/my-events/my-events.component";

const routes: Routes = [
  {
    path: "welcome",
    component: WelcomeComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "user-events",
    component: UserEventsComponent
  },
  {
    path: "user-events/:id",
    component: UserEventDetailsComponent
  },
  {
    path: "new-user-event",
    component: NewUserEventComponent
  },
  {
    path: "users/:id/edit-profile",
    component: EditProfileComponent
  },
  {
    path: "new-event",
    component: NewEventComponent
  },
  {
    path: "events",
    component: EventsComponent
  },
  {
    path: "users/:id",
    component: UserComponent
  },
  {
    path: "users/:id/events",
    component: MyEventsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}