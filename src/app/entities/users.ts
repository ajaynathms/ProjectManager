import { Injectable } from '@angular/core';

export interface Users {
  user_ID: number;
  first_Name,last_Name,employee_ID: string;
  project_ID?: number;
}