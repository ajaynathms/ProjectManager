import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../entities/project';
import { Users } from '../../entities/users';
import { AddProjectService } from './add-project.service';
import { Message, ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.css'],
    providers: [AddProjectService,ConfirmationService,DatePipe]
})

export class AddProjectComponent implements OnInit {
    msgs: Message[] = [];
    projectsList: Project[];
    usersList: Users[];

    public addOrUpdateBtn: string = 'Add';


    private addProjectForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private service: AddProjectService, private confirmationService: ConfirmationService,private datePipe: DatePipe) {
    }

    ngOnInit() {

        this.addProjectForm = this.formBuilder.group({
            projectId: [0, Validators.required],
            projectNameControl: [null, Validators.required],
            checkDatesControl: [null],
            startDateControl: [null],
            endDateControl: [null],
            status: ["Active"],
            priorityControl: [null, Validators.required],
            selectedManagerControl: [null, Validators.required],
            selectedManagerName: [null, Validators.required],
            priorityDisplayControl: [null]
        });
        this.getUsers();
        this.getAllProject();

    }

    getUsers() {
        this.usersList = [];
        this.service.getUsers()
            .subscribe(data => { this.usersList = data; });
    }
    getAllProject() {
        this.projectsList = [];
        this.service.getAllProject()
            .subscribe(data => { debugger;this.projectsList = data; });
    }


    updateProject(project: Project) {
      
        this.addProjectForm = this.formBuilder.group({
            projectId: [project.Project_ID, Validators.required],
            projectNameControl: [project.ProjectName, Validators.required],
            checkDatesControl: [project.End_Date === null && project.Start_Date === null ? false : true],
            startDateControl: [this.datePipe.transform(project.Start_Date,'MM/dd/yyyy').toString()],
            endDateControl:  [this.datePipe.transform(project.End_Date,'MM/dd/yyyy').toString()],
            status: [project.Status],
            priorityControl: [project.Priority, Validators.required],
            selectedManagerControl: [project.Manager_ID, Validators.required],
            selectedManagerName: [project.Manager_Name, Validators.required],
            priorityDisplayControl: [null]
        });

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
        this.addProjectForm.reset();

    }



    addProjectReset() {
        this.addProjectForm.reset();
        this.addOrUpdateBtn = 'Add';
    }

    addProjectSubmit() {

        this.service.updateProject({
            Project_ID: this.addProjectForm.get('projectId').value,
            End_Date: this.addProjectForm.get('endDateControl').value,
            Start_Date: this.addProjectForm.get('startDateControl').value,
            Manager_ID: this.addProjectForm.get('selectedManagerControl').value,
            Priority: this.addProjectForm.get('priorityControl').value,
            ProjectName: this.addProjectForm.get('projectNameControl').value,
            Status: this.addProjectForm.get('status').value
        })
            .subscribe(data => { this.showMessage(data.status.Result, data.status.Message); });

    }



    assignManager(userId: number, mgrName: string) {

        this.addProjectForm.patchValue({
            selectedManagerControl: userId,
            selectedManagerName: mgrName
        });
    }

    suspendProject(project: Project) {
  
        this.confirmationService.confirm({
            message: 'Are you sure that you want to suspend project : ' + project.ProjectName + '?',
            accept: () => {
                project.Status="Suspended";
                this.service.updateProject(project)
                    .subscribe(data => { this.showMessage(data.status.Result, data.status.Message); });
            }
        });
    }






}