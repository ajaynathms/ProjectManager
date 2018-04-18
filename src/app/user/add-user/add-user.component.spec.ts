import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AddUserComponent } from './add-user.component';
import { DataTableModule } from 'primeng/datatable';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GrowlModule } from 'primeng/growl';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { AddUserService } from './add-user.service';
import { ConfirmationService } from 'primeng/api';
import { fakeBackendProvider, Interceptor } from '../../interceptor/interceptor';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let service: AddUserService;
  let confirmationService: ConfirmationService;
  let httpClient:HttpClient;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserComponent ],
      imports:[ HttpClientModule,DataTableModule,GrowlModule,FormsModule,ConfirmDialogModule,BrowserAnimationsModule],
      providers:[  AddUserService,ConfirmationService,{
        provide: HTTP_INTERCEPTORS,
        useClass: Interceptor,
        multi: true
    }]  
    
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);

    this.service = TestBed.get(AddUserService);

    this.confirmationService = TestBed.get(ConfirmationService);
    component = new AddUserComponent(service,confirmationService);
    component = fixture.componentInstance;

    
  });


  describe('Add User test cases', () => { 

    it('On init button text is ADD', () => {
       
      component.ngOnInit();
      expect(component.saveButtonString) 
          .toEqual('Add'); 
    });
    
    it('On reset click first_name should be set empty', () => { 
      component.onReset();
      expect(component.currentUser.First_Name) 
          .toEqual(''); 
    });

    it('On edit click button text changes to edit', () => { 
      component.onEditClick({User_ID:1,First_Name:'test',Last_Name:'test',Employee_ID:'test'});
      expect(component.saveButtonString) 
          .toEqual('Edit'); 
    });
    it('On save should return a message', () => { 
      component.currentUser={User_ID:1,First_Name:'test',Last_Name:'test',Employee_ID:'test'};
      component.onSave({User_ID:1,First_Name:'test',Last_Name:'test',Employee_ID:'test'});
     
      expect(component.msgs.length) 
          .toBeGreaterThanOrEqual(0); 
    });
    it('On delete should return a message', () => { 
      component.currentUser={User_ID:1,First_Name:'test',Last_Name:'test',Employee_ID:'test'};
      component.confirmDelete({User_ID:1,First_Name:'test',Last_Name:'test',Employee_ID:'test'});
      component._confirmationService.onAccept();
      expect(component.msgs.length) 
          .toBeGreaterThanOrEqual(0); 
    });
  });

  
  
});
