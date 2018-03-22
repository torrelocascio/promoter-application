
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

  getId(id){
    return this.myHttp.get(`${environment.apiBase}/api/user-events/${id}`,
          { withCredentials: true })
          .toPromise()
          .then(res => res.json())
          // .map(res => res.json())
  }

  createNewUserEvent(dataToSend){
    return this.myHttp
      .post(`${environment.apiBase}/api/new-user-events`, dataToSend, { withCredentials: true })
      .toPromise()
      .then(res => res.json());
  }

  updateUserEvent(id, updates){
    return this.myHttp.put(`${environment.apiBase}/api/user-events/${id}`, updates, { withCredentials: true })
    .map(res => res.json());
  }

  deleteUserEvent(id){
    return this.myHttp.delete(`${environment.apiBase}/api/user-events/${id}`,
        { withCredentials: true })
        .toPromise()
  }
  acceptInvitation(userId, userEventId, promoterEventId){
    return this.myHttp.put(`${environment.apiBase}/api/users/${userId}/user-events/accept`,userEventId, promoterEventId)
      .toPromise()
  }

}




