import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {INgxMyDpOptions} from 'ngx-mydatepicker';

@Component({
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit  {
    pagename = 'add-project';
    myOptions: INgxMyDpOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
    };

    private myForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.myForm = this.formBuilder.group({
            // Empty string or null means no initial value. Can be also specific date for
            // example: {date: {year: 2018, month: 10, day: 9}} which sets this date to initial
            // value.

            myDate: [null, Validators.required]
            // other controls are here...
        });
    }

    setDate(): void {
        // Set today date using the patchValue function
        let date = new Date();
        this.myForm.patchValue({myDate: {
        date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()}
        }});
    }

    clearDate(): void {
        // Clear the date using the patchValue function
        this.myForm.patchValue({myDate: null});
    }
    
    sliderChange(value) {
        console.log(value);
    }
}