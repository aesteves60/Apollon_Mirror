import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Subject} from "rxjs/Subject";
import {Alert} from "./alert/alert";

@Injectable()
export class AlertService {
  private subject: Subject<Alert> = new Subject<Alert>();

  success(message: string) {
    this.alert('alert-success',message);
  }

  error(message: string) {
    this.alert('alert-error',message);
  }

  alert( type: string,  message: string){
    this.subject.next(<Alert> {
      type : type ,
      message : message
    });
    //supprime le message au bout de 5 secondes
    setTimeout(() => {
      this.subject.next(<Alert> {
        type : '' ,
        message : ''
      });
    }, 5000);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
