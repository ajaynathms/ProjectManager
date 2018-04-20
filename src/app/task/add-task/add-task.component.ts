import { Component, OnInit, ChangeDetectorRef, OnDestroy, NgZone, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { Subject } from 'rxjs/Subject';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Project } from '../../entities/project';
import { TaskModel } from '../../entities/task';
import { Users } from '../../entities/users';
import { DataService } from '../../entities/dataservice';
import { ViewTaskService } from '../view-task/view-task.service';
import { ParenTask } from '../../entities/parent-task';
import { AddUserComponent } from '../../user/add-user/add-user.component';
import { AddUserService } from '../../user/add-user/add-user.service';
import { Message } from 'primeng/api';


@Component({
    selector: 'add-task', 
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    providers:[DataService,ViewTaskService,AddUserService]
})

export class AddTaskComponent implements OnInit {
    formMode: String = 'Add Task';
    btnMode: String = 'Add';
    msgs: Message[] = [];
    selectedProject: string = '';
    selectedUser: string = '';
    selectedTask: string = '';
    selectedUserId: Number = null;
    selectedPTaskId: Number = null;
    selectedProjectId: Number = null;
   
    projectsList: Project[] = [];
    parentTasksList: ParenTask[] = [];
   
    usersList: Users[] = [];
    
    private myForm: FormGroup;
    private addTaskForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private dataService: DataService,
        private router: Router,
        private service:ViewTaskService,
        private userService:AddUserService
    ) {
        this.addTaskForm = this.formBuilder.group({
            TaskId: [0],
            ProjectIdControl: [null, Validators.required],
            TaskNameControl: [null, Validators.required],
            IsParentTaskControl: [null],
            PriorityControl: [null, Validators.required],
            PriorityDisplayControl: [null],
            ParentTaskControl: [null],
            StartDateControl: [null, Validators.required],
            EndDateControl: [null, Validators.required],
            UserIdControl: [null]
        });
        

        // check the route for edit and then subscribe to data service
        if (this.router.url === '/edittask') {
            this.dataService.taskMessage.subscribe(editTaskMessage => {
                if (editTaskMessage !== null) {
                    let isParent;
                    if (editTaskMessage.parentId !== null) {
                        isParent = true;
                    } else  {
                        isParent = false;
                    }
                    this.formMode = editTaskMessage.formMode;
                    this.btnMode = editTaskMessage.btnMode;
                    this.addTaskForm.patchValue({
                        TaskNameControl: editTaskMessage.task.TaskName,
                        PriorityControl: editTaskMessage.priority,
                        IsParentTaskControl: isParent                           
                    });
                    this.setDate(editTaskMessage.startDate, 'StartDateControl');
                    this.setDate(editTaskMessage.endDate, 'EndDateControl');
                    this.selectedProject = editTaskMessage.selectedProject;
                  
                }    
            });
        }
        
    }

    ngOnInit() {
        this.getAllProject();
        this.getAllParentTask();
        this.getAllUsers();
    }

    getAllProject() {
        this.projectsList = [];
        this.service.getAllProject()
            .subscribe(data => { this.projectsList = data; });
    }
    getAllParentTask() {
        this.projectsList = [];
        this.service.getAllParentTasks()
            .subscribe(data => { this.parentTasksList = data; });
    }

    getAllUsers() {
        this.usersList = [];
        this.userService.getUsers()
            .subscribe(data => { this.usersList = data; });
    }

    setDate(date: String, dateControl: String): void {
        let getDate = new Date(parseInt(date.substring(6)), parseInt(date.substring(3, 5)) - 1, parseInt(date.substring(0, 2)));
        if (dateControl == 'StartDateControl') {
            this.addTaskForm.patchValue({
                StartDateControl: {
                    date: {
                        year: getDate.getFullYear(),
                        month: getDate.getMonth() + 1,
                        day: getDate.getDate()
                    }
                }
            });
        } else if (dateControl == 'EndDateControl') {
            this.addTaskForm.patchValue({
                EndDateControl: {
                    date: {
                        year: getDate.getFullYear(),
                        month: getDate.getMonth() + 1,
                        day: getDate.getDate()
                    }
                }
            });
        }
    }

    clearDate(): void {
        // Clear the date using the patchValue function
        this.addTaskForm.reset();
    }

    selectProject(projectName, projectId) {
        this.selectedProjectId = projectId;
        this.selectedProject = projectName;
        this.addTaskForm.patchValue({
            ProjectIdControl: projectId
        });
    }

    assignUser(userId, userName) {
        this.selectedUserId = userId;
        this.selectedUser =userName;
        this.addTaskForm.patchValue({
            UserIdControl  : userId
        });
    }

    selectPTask(pTaskName, pTaskId) {
        this.selectedPTaskId = pTaskId;
        this.selectedTask = pTaskName;
        this.addTaskForm.patchValue({
            ParentTaskControl: pTaskId
        });
    }

    addTaskSubmit() {

   
    this.service.updateTask({
        Task_ID:this.addTaskForm.get('TaskId').value,
        End_Date:this.addTaskForm.get('EndDateControl').value,
        Project_ID:this.addTaskForm.get('ProjectIdControl').value,
        Start_Date:this.addTaskForm.get('StartDateControl').value,
        Parent_ID:this.addTaskForm.get('ParentTaskControl').value,
        Priority:this.addTaskForm.get('PriorityControl').value,
         Status:true,
         TaskName:this.addTaskForm.get('TaskNameControl').value,
         User_ID:this.addTaskForm.get('UserIdControl').value
    })
        .subscribe(data => { this.showMessage(data.status.Result, data.status.Message); this.clearDate();});

    }

    editMode(editForm) {
        
        this.formMode = 'Edit Task';
        this.btnMode = 'Update';
    }

    showMessage(status: boolean, message: string) {
        this.msgs = [];
        if (status === true) {
            this.msgs.push({ severity: 'success', summary: "Success", detail: message });
        }
        else {
            this.msgs.push({ severity: 'error', summary: "Error", detail: message });

        }
        this.getAllProject();

    }


}