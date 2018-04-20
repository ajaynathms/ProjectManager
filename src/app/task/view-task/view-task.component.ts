import { Component, OnInit } from '@angular/core';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Router } from '@angular/router';
import { TaskModel } from '../../entities/task';
import { Project } from '../../entities/project';
import { DataService } from '../../entities/dataservice';
import { ViewTaskService } from './view-task.service';

@Component({
    templateUrl: './view-task.component.html',
    styleUrls: ['./view-task.component.css'],
    providers: [DataService, ViewTaskService]
})

export class ViewTaskComponent implements OnInit {
    tasksList: TaskModel[] = [];

    projectsList: Project[] = [];
    selectedProject: String;
    selectedProjectId: Number;

    constructor(private router: Router, private dataService: DataService, private service: ViewTaskService) { }
    ngOnInit() {
        this.getAllProject();
    }
    assignProject(projName, projId) {
        this.selectedProjectId = projId;
        this.selectedProject = projName;
        this.getAllTask(projId);
    }

    getAllProject() {
        this.projectsList = [];
        this.service.getAllProject()
            .subscribe(data => { this.projectsList = data; });
    }

    getAllTask(id: number) {
        this.service.getAllTasks()
            .subscribe(data => {
                this.tasksList = data.filter(
                    task => task.Project_ID === id);
            });
    }
    editTask(task: TaskModel) {
        this.router.navigate(['/edittask']);
        // this.dataService.changeMessage("Hello from Sibling");
        let taskBlock = null;

        let selectedTask = task;
        taskBlock = task;
        taskBlock.formMode = 'Edit Task';
        taskBlock.btnMode = 'Update';
        taskBlock.selectedProject = this.selectedProject;
        taskBlock.selectedProjectId = this.selectedProjectId;

        this.dataService.sendTaskBlock(taskBlock);
    }
}