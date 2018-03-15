import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./components/signup/signup.component";
import {LoginComponent} from "./components/login/login.component";
import {UserEventsComponent} from "./components/user-events/user-events.component";

const routes: Routes = [
  {
    path: 'signup' , 
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user-events',
    component: UserEventsComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}