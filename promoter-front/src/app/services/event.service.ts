import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";

@Injectable()
export class EventService {

  constructor(private myHttp: Http) {}

  getAllEvents(){
    return this.myHttp.get(`${environment.apiBase}/api/events`,
    { withCredentials: true })
    .map(res => res.json())
  }

  getId(id){
    return this.myHttp.get(`${environment.apiBase}/api/events/${id}`,
          { withCredentials: true })
          .toPromise()
          .then(res => res.json())
          // .map(res => res.json())
  }

  createNewEvent(dataToSend){
    return this.myHttp
      .post(`${environment.apiBase}/api/new-events`, dataToSend, { withCredentials: true })
      .toPromise()
      .then(res => res.json());
  }

  updateEvent(id, updates){
    return this.myHttp.put(`${environment.apiBase}/api/events/${id}`, updates, { withCredentials: true })
    .map(res => res.json());
  }

  deleteEvent(id){
    return this.myHttp.delete(`${environment.apiBase}/api/events/${id}`,
        { withCredentials: true })
        .toPromise()
  }

  getPromoterEventsPerPromoter(id){
    return this.myHttp.get(`/api/users/${id}/events`,
  {withCredentials:true}).toPromise()
}

sendTheEvents(userEventId, promoterEventId){
  var theThing = {promoterEventThing: ""};
  theThing.promoterEventThing = promoterEventId;
  console.log("TheThingKKKKKKKKKKKKKK",theThing)
  return this.myHttp.put(`${environment.apiBase}/api/user-events/${userEventId}/invite`, theThing, { withCredentials: true })
    .toPromise()
}

}