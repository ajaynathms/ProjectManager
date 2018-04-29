import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { RequestOptions } from '@angular/http';
import { Users } from '../../entities/users';
import { Observable } from 'rxjs/Observable';
import { UserEdit } from '../../entities/useredit';
import { Status } from '../../entities/status';
import { Options } from 'selenium-webdriver/chrome';
import { environment } from '../../../environments/environment';

@Injectable()
export class AddUserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
   
    return this.http.get<Users[]>(environment.apiUrl+"/api/getAllUsers");
    
  }
  updateUsers(user:Users): Observable<UserEdit> {
    

    return this.http.post<UserEdit>(environment.apiUrl+"/api/updateUser",user );
  }
  deleteUser(user:Users): Observable<Status> {
  

    return this.http.post<Status>(environment.apiUrl+"/api/DeleteUser",user);
  }
}


