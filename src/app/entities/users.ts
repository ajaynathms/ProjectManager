import { Injectable } from '@angular/core';

export interface Users {
  User_ID: number;
  First_Name,Last_Name,Employee_ID: string;
  Project_ID?: number;
}