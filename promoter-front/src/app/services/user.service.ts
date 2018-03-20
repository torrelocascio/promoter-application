import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";

@Injectable()
export class UserService {

  constructor(private myHttp: Http) { }

  goToMyProfile(){
    return this.myHttp.get(`${environment.apiBase}/api/users/:id`,
    { withCredentials: true })
    .map(res => res.json())
  }

  getId(id){
    return this.myHttp.get(`${environment.apiBase}/api/users/${id}`,
          { withCredentials: true })
          .toPromise()
          .then(res => res.json())
          // .map(res => res.json())
  }

  updateMyProfile(id, updates){
    return this.myHttp.put(`${environment.apiBase}/api/users/${id}`, updates, { withCredentials: true })
    .map(res => res.json());

  }

  deleteMyProfile(){
    return this.myHttp.delete(`${environment.apiBase}/api/users/:id/update`,
    { withCredentials: true })
    .map(res => res.json())

  }






}

