import { Component, OnInit, ChangeDetectorRef, OnDestroy, NgZone, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { Subject } from 'rxjs/Subject';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '../../entities/project';
import { TaskModel } from '../../entities/task';
import { Users } from '../../entities/users';
import { ViewTaskService } from '../view-task/view-task.service';
import { ParenTask } from '../../entities/parent-task';
import { AddUserComponent } from '../../user/add-user/add-user.component';
import { AddUserService } from '../../user/add-user/add-user.service';
import { Message } from 'primeng/api';
import { TaskService } from '../../utilities/common-service';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [ViewTaskService, AddUserService, DatePipe]
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
        private router: Router,
        private taskService: TaskService,
        private service: ViewTaskService,
        private userService: AddUserService,
        private datePipe: DatePipe
    ) {



        // check the route for edit and then subscribe to data service
        if (this.router.url === '/edittask') {
            if (this.taskService.task !== null) {
                this.editMode();
                this.onFormEditInit(this.taskService.task);

            }
        }

        else {
            this.onFormInit();
            this.enableControls();
        }
        
        // this.addTaskForm.valueChanges.subscribe(() => {
        //     if (this.addTaskForm.controls['IsParentTaskControl'].value === true) {
        //         this.disableControls();
        //     }
        //     else {
        //         this.enableControls();


        //     }
        // });
    }
    handleChange(event)
        {
            console.log(this.addTaskForm.get('IsParentTaskControl').value);
            if (this.addTaskForm.get('IsParentTaskControl').value==false)
            {
                this.enableControls();
            } 
            else{
                this.disableControls();
            }
        }

    disableControls() {
        this.addTaskForm.get('PriorityControl').disable();
        this.addTaskForm.get('PriorityDisplayControl').disable();
        this.addTaskForm.get('StartDateControl').disable();
        this.addTaskForm.get('EndDateControl').disable();
    }
    enableControls()
    {
        this.addTaskForm.get('PriorityControl').enable();
        this.addTaskForm.get('StartDateControl').enable();
        this.addTaskForm.get('EndDateControl').enable();
        this.addTaskForm.get('PriorityDisplayControl').enable();
    }
    onFormInit() {
        this.addTaskForm = this.formBuilder.group({
            TaskId: [0],
            ProjectIdControl: [null, Validators.required],
            TaskNameControl: [null, Validators.required],
            IsParentTaskControl: [false],
            PriorityControl: [null, Validators.required],
            PriorityDisplayControl: [null],
            ParentTaskControl: [null],
            StartDateControl: [null, Validators.required],
            EndDateControl: [null, Validators.required],
            UserIdControl: [null]
        });
        this.selectedTask='';
    }
    onFormEditInit(task: TaskModel) {
        this.addTaskForm = this.formBuilder.group({
            TaskId: [task.Task_ID],
            ProjectIdControl: [task.Project_ID, Validators.required],
            TaskNameControl: [task.TaskName, Validators.required],
            IsParentTaskControl: [task.User_ID === null ? true : false],
            PriorityControl: [task.Priority, Validators.required],
            PriorityDisplayControl: [task.Priority],
            ParentTaskControl: [task.Parent_ID],
            StartDateControl: [task.Start_Date !== null ? this.datePipe.transform(task.Start_Date,'MM/dd/yyyy').toString() : null, Validators.required],
            EndDateControl: [task.End_Date !== null ? this.datePipe.transform(task.End_Date,'MM/dd/yyyy').toString() : null, Validators.required],
            UserIdControl: [task.User_ID]
        });
        if(task.User_ID === null )
        {
            this.disableControls();
        }
        this.selectedProject = task.Project_Name;
        this.selectedUser = task.User_Name;
        this.selectedPTaskId = task.Parent_ID;
        this.selectedTask = task.Parent_Name;
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
        this.selectedUser = userName;
        this.addTaskForm.patchValue({
            UserIdControl: userId
        });
    }

    selectPTask(pTaskId, pTaskName) {
        this.selectedPTaskId = pTaskId;
        this.selectedTask = pTaskName;
        this.addTaskForm.patchValue({
            ParentTaskControl: pTaskId
        });
    }

    addTaskSubmit() {


        this.service.updateTask({
            Task_ID: this.addTaskForm.get('TaskId').value,
            End_Date: this.addTaskForm.get('EndDateControl').value !== null ? this.datePipe.transform(this.addTaskForm.get('EndDateControl').value,'MM/dd/yyyy').toString() : null ,
            Project_ID: this.addTaskForm.get('ProjectIdControl').value,
            Start_Date: this.addTaskForm.get('StartDateControl').value !== null ? this.datePipe.transform(this.addTaskForm.get('StartDateControl').value,'MM/dd/yyyy').toString() : null ,
            Parent_ID: this.addTaskForm.get('ParentTaskControl').value,
            Priority: this.addTaskForm.get('PriorityControl').value,
            Status: true,
            TaskName: this.addTaskForm.get('TaskNameControl').value,
            User_ID: this.addTaskForm.get('UserIdControl').value
        })
            .subscribe(data => { this.showMessage(data.status.Result, data.status.Message); this.clearDate();  this.formMode='Add Task'; this.onFormInit();this.enableControls();});

    }

    editMode() {

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