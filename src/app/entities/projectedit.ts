import { Injectable } from '@angular/core';
import { Status } from './status';
import { Users } from './users';
import { Project } from './project';

export interface ProjectEdit {
  status: Status;
  project: Project;
}