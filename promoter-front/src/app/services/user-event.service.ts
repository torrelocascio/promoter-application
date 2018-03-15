import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import {environment} from '../../environments/environment'
import "rxjs/add/operator/map"

@Injectable()
export class UserEventService {

  constructor(
    private myHttp: Http
  ) { }

  getAllUserEvents(){
    return this.myHttp.get(`${environment.apiBase}/api/user-events`,
  
    { withCredentials: true })
    .map(res=>res.json()) 
  }
  
}

