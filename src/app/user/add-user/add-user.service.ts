import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Users } from '../../entities/users';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddUserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>("assets/user-data.json");
  }
}
