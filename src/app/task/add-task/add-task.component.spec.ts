import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DataTableModule } from 'primeng/datatable';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GrowlModule } from 'primeng/growl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { fakeBackendProvider, Interceptor } from '../../interceptor/interceptor';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../../utilities/common-service';
import { AddTaskComponent } from './add-task.component';
import { AddUserService } from '../../user/add-user/add-user.service';
import { ViewTaskService } from '../view-task/view-task.service';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  let confirmationService: ConfirmationService;
  let httpClient: HttpClient;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaskComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, CalendarModule, SliderModule, HttpClientModule, FormsModule, DataTableModule, GrowlModule, FormsModule, ConfirmDialogModule, BrowserAnimationsModule],
      providers: [ViewTaskService, TaskService,AddUserService,DatePipe, {
        provide: HTTP_INTERCEPTORS,
        useClass: Interceptor,
        multi: true
      }]

    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;


  });


  describe('Add Project test cases', () => {

    it('On init  project popup should have zero or more list items', () => {
      component.ngOnInit();
      expect(component.projectsList.length).toBeGreaterThanOrEqual(0);
    });
    // it('get all task should return zero or more tasks', () => {
    //   component.getAllTask(1);
    //   expect(component.tasksList.length).toBeGreaterThanOrEqual(0);
    // });
    it('On success  should return a message', () => { 
      component.showMessage(true,"Sucess!");
     
      expect(component.msgs.length) 
          .toBeGreaterThanOrEqual(1); 
    });
    it('On error  should return a message', () => { 
      component.showMessage(false,"Error occured!");
     
      expect(component.msgs.length) 
          .toBeGreaterThanOrEqual(1); 
    });

    it('On form init edit  selected project name should be shown', () => { 
      component.onFormEditInit({Task_ID:1,Status:true,User_ID:null,Project_Name:'test',End_Date:'01/01/2017',Start_Date:'01/10/2018'});
     
      expect(component.selectedProject) 
          .toBe("test"); 
    });
    it('On form init edit  selected project name should be shown', () => { 
      component.onFormEditInit({Task_ID:1,Status:true,Project_Name:'test'});
     
      expect(component.selectedProject) 
          .toBe("test"); 
    });
    it('On edit  button text button text is edit ', () => { 
      component.editMode();
     
      expect(component.formMode) 
          .toBe("Edit Task"); 
    });
    it('On task submit  form mode Add task', () => { 
      component.addTaskSubmit();
     
      expect(component.formMode) 
          .toBe("Add Task"); 
    });

    it('On task submit  form mode Add task', () => { 
      component.addTaskForm.patchValue ({EndDateControl: '01/01/2017',StartDateControl:'01/02/2017'});
      component.addTaskSubmit();
     
      expect(component.formMode) 
          .toBe("Add Task"); 
    });

    it('On select  task project name is set', () => { 
      component.selectProject("test",1);
     
      expect(component.selectedProject) 
          .toBe("test"); 
    });
    it('On select  task project name is set', () => { 
      component.selectProject("test",1);
     
      expect(component.selectedProject) 
          .toBe("test"); 
    });
    
    it('On assignUser user name is set', () => { 
      component.assignUser(1,"test");
     
      expect(component.selectedUser) 
          .toBe("test"); 
    });
    it('On select Task task name is set', () => { 
      component.selectPTask(1,"test");
     
      expect(component.selectedTask) 
          .toBe("test"); 
    });

    it('On handle change parent control set disable control', () => { 
      component.onFormInit();
      component.addTaskForm.patchValue ({IsParentTaskControl: true});
  
      component.handleChange(null);
     
      expect(component.addTaskForm.get('PriorityControl').disabled) 
          .toBe(true); 
    });

    it('On handle change parent control (false) set enable control', () => { 
      component.onFormInit();
      component.addTaskForm.patchValue ({IsParentTaskControl: false});
  
      component.handleChange(null);
     
      expect(component.addTaskForm.get('PriorityControl').enabled) 
          .toBe(true); 
    });
    
    
    

  });



});
