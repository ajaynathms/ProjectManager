import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { AddUserComponent } from './user/add-user/add-user.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {DataTableModule} from 'primeng/datatable';
import {GrowlModule} from 'primeng/growl';
import { Interceptor, fakeBackendProvider } from './interceptor/interceptor';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    AddProjectComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IonRangeSliderModule,
    NgxMyDatePickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,DataTableModule,GrowlModule,ConfirmDialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
