import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

//   private messageSource = new BehaviorSubject<string>("default message");
//   currentMessage = this.messageSource.asObservable();
  private taskBlock = new BehaviorSubject<any>(null);
  taskMessage = this.taskBlock.asObservable();

  constructor() { }

//   changeMessage(message: string) {
//     this.messageSource.next(message)
//   }

  sendTaskBlock(block: any) {
      this.taskBlock.next(block);
  }

  clearTaskBlock() {
      this.taskBlock = null;
  }

}