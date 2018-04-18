import { Component, OnInit } from '@angular/core';
import { AddUserService } from './add-user.service';
import { Users } from '../../entities/users';
import { Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css'],
    providers: [AddUserService, ConfirmationService]
})

export class AddUserComponent implements OnInit {
    cd: any;
    msgs: Message[] = [];
    userList: Users[];
    currentUser: Users;
    saveButtonString: String;
    status:boolean;
    _confirmationService: ConfirmationService
    constructor(private service: AddUserService, private confirmationService: ConfirmationService) {
        this._confirmationService=confirmationService;
     }


    ngOnInit(): void {
        this.saveButtonString = "Add";
        this.onReset();

        this.getUsers();
    }

    onReset() {
        this.saveButtonString = "Add";

        this.currentUser = { user_ID: 0, employee_ID: "", first_Name: "", last_Name: "" };
    }
   
     onEditClick(user: Users) {
        this.saveButtonString = "Edit";

        this.currentUser = Object.assign({}, this.currentUser, user);
    }
    onSave(user: Users) {
        //  this.currentUser = user;
        
        this.updateUser(this.currentUser);
      
    }
    
    updateUser(user: Users) {
        

        this.service.updateUsers(user)
            .subscribe(data => {
                this.showMessage(data.status.status,data.status.message);
                
            });

    }
    showMessage(status: boolean, message: string) {
        if (status === true) {
            this.msgs.push({ severity: 'success', summary: "Success", detail: message });
        }
        else {
            this.msgs.push({ severity: 'error', summary: "Error", detail: message });

        }
        this.getUsers();

    }
    getUsers() {
        this.service.getUsers()
            .subscribe(data => { debugger; this.userList = data; });
    }

    confirmDelete(user: Users) {

        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete user : ' + user.employee_ID + '?',
            accept: () => {
                this.service.deleteUser(user)
                .subscribe(data => {
                    this.showMessage(data.status,data.message);
                });            }
        });
    }

   




}