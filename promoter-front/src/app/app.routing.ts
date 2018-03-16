import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";
import { UserEventsComponent } from "./components/user-events/user-events.component";
import { UserEventDetailsComponent } from "./components/user-event-details/user-event-details.component";
import { NewUserEventComponent } from "./components/new-user-event/new-user-event.component";
const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}