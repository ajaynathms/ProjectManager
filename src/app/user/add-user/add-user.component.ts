import { Component, OnInit } from '@angular/core';
import { AddUserService } from './add-user.service';
import { Users } from '../../entities/users';

@Component({
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css'],
    providers:[AddUserService]
})

export class AddUserComponent implements OnInit  {
    userList:Users[];

    constructor(private service:AddUserService) { }
    
  
    ngOnInit(): void {
        this.getUsers();
    }
    getUsers() {
        this.service.getUsers()
    .subscribe(data => {this.userList=data;});
      }
      

}