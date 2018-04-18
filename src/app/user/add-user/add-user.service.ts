import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Users } from '../../entities/users';
import { Observable } from 'rxjs/Observable';
import { UserEdit } from '../../entities/useredit';
import { Status } from '../../entities/status';

@Injectable()
export class AddUserService {
  apiEndPOint:String='api';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
   
    return this.http.get<Users[]>(this.apiEndPOint+"/getAllUsers");
    //return this.http.get<Users[]>("assets/user-data.json");
  }
  updateUsers(user:Users): Observable<UserEdit> {
    return this.http.post<UserEdit>("api/updateUser",user);
  }
  deleteUser(user:Users): Observable<Status> {
    return this.http.post<Status>("api/deleteUser",user);
  }
}
