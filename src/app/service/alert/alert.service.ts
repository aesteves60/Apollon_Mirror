import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';

@Injectable()
export class AlertService {
  private subject: Subject<Alert> = new Subject<Alert>();

  success(message: string) {
    this.alert('alert alert-success',message);
  }

  error(message: string, err: any = null) {
    if(err) console.log(err);
    this.alert('alert alert-error',message);
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

  close(){
    this.subject.next(<Alert> {
      type : '' ,
      message : ''
    });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}

export class Alert {
  type: string;
  message: string;
}

