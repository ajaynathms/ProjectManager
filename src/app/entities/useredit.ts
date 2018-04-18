import { Injectable } from '@angular/core';
import { Status } from './status';
import { Users } from './users';

export interface UserEdit {
  status: Status;
  user: Users;
}