
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";

@Injectable()
export class UserEventService {

  constructor(private myHttp: Http) {}

  getAllUserEvents(){
    return this.myHttp.get(`${environment.apiBase}/api/user-events`,
    { withCredentials: true })
    .map(res => res.json())
  }
}

