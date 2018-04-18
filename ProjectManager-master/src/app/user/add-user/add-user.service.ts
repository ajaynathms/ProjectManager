import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { RequestOptions } from '@angular/http';
import { Users } from '../../entities/users';
import { Observable } from 'rxjs/Observable';
import { UserEdit } from '../../entities/useredit';
import { Status } from '../../entities/status';
import { Options } from 'selenium-webdriver/chrome';

@Injectable()
export class AddUserService {
  apiEndPOint:String='http://localhost:61734';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
   
    return this.http.get<Users[]>(this.apiEndPOint+"/api/getAllUsers");
    
  }
  updateUsers(user:Users): Observable<UserEdit> {
    

    return this.http.post<UserEdit>(this.apiEndPOint+"/api/updateUser",user );
  }
  deleteUser(user:Users): Observable<Status> {
    return this.http.post<Status>(this.apiEndPOint+"/api/DeleteUser ",user,{headers:new HttpHeaders().set('Content-Type', 'application/json') });
  }
}


