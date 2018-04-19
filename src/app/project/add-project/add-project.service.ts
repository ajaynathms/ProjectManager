import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { RequestOptions } from '@angular/http';
import { Users } from '../../entities/users';
import { Observable } from 'rxjs/Observable';
import { UserEdit } from '../../entities/useredit';
import { Status } from '../../entities/status';
import { Options } from 'selenium-webdriver/chrome';
import { environment } from '../../../environments/environment';
import { Project } from '../../entities/project';
import { ProjectEdit } from '../../entities/projectedit';

@Injectable()
export class AddProjectService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
   
    return this.http.get<Users[]>(environment.apiUrl+"/api/getAllUsers");
    
  }

  getAllProject(): Observable<Project[]> {
   
    return this.http.get<Project[]>(environment.apiUrl+"/api/getAllProjects");
    
  }
  updateProject(proj:Project): Observable<ProjectEdit> {
    

    return this.http.post<ProjectEdit>(environment.apiUrl+"/api/updateProject",proj );
  }
}


