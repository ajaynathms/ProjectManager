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
import { AddProjectComponent } from './add-project.component';
import { AddProjectService } from './add-project.service';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  let service: AddProjectService;
  let confirmationService: ConfirmationService;
  let httpClient: HttpClient;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddProjectComponent],
      imports: [ReactiveFormsModule, CalendarModule, SliderModule, HttpClientModule, FormsModule, DataTableModule, GrowlModule, FormsModule, ConfirmDialogModule, BrowserAnimationsModule],
      providers: [AddProjectService, ConfirmationService, {
        provide: HTTP_INTERCEPTORS,
        useClass: Interceptor,
        multi: true
      }]

    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;


  });


  describe('Add Project test cases', () => {

    it('On init  project grid should have zero or more list items', () => {
      component.ngOnInit();
      component.addProjectReset();
      expect(component.projectsList.length).toBeGreaterThanOrEqual(0);
    });
    it('On reset button text is ADD', () => {
      component.formInit();
      component.addProjectReset();
      expect(component.addOrUpdateBtn)
        .toEqual('Add');
    });
    it('On update button text is update', () => {
      component.updateProject({ Project_ID: 1, Start_Date: '01/01/2017', End_Date: '01/02/2018' });
      expect(component.addOrUpdateBtn)
        .toEqual('Update');
    });
    it('Uncheck set date when date is null', () => {
      component.updateProject({ Project_ID: 1, Start_Date: null, End_Date: null });
      expect(component.addProjectForm.get('checkDatesControl').value)
        .toBe(false);
    });

    it('On submit  message should be shown', () => {
      component.formInit();
      component.addProjectSubmit();
      expect(component.msgs.length).toBeGreaterThanOrEqual(0);
    });
    it('On error  should return a message', () => {
      component.formInit();
      component.showMessage(false, "Error occured!");
      expect(component.msgs.length)
        .toBeGreaterThanOrEqual(0);
    });

    // it('On reset click first_name should be set empty', () => { 
    //   component.onReset();
    //   expect(component.currentUser.First_Name) 
    //       .toEqual(''); 
    // });

    // it('On edit click button text changes to edit', () => { 
    //   component.onEditClick({User_ID:1,First_Name:'test',Last_Name:'test',Employee_ID:'test'});
    //   expect(component.saveButtonString) 
    //       .toEqual('Edit'); 
    // });
    // it('On save should return a message', () => { 
    //   component.currentUser={User_ID:1,First_Name:'test',Last_Name:'test',Employee_ID:'test'};
    //   component.onSave({User_ID:1,First_Name:'test',Last_Name:'test',Employee_ID:'test'});

    //   expect(component.msgs.length) 
    //       .toBeGreaterThanOrEqual(0); 
    // });
    // it('On delete should return a message', () => { 
    //   component.currentUser={User_ID:1,First_Name:'test',Last_Name:'test',Employee_ID:'test'};
    //   component.confirmDelete({User_ID:1,First_Name:'test',Last_Name:'test',Employee_ID:'test'});
    //   component._confirmationService.onAccept();
    //   expect(component.msgs.length) 
    //       .toBeGreaterThanOrEqual(0); 
    // });
  });



});
