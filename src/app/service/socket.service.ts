import {Injectable}   from '@angular/core';
import * as io        from 'socket.io-client';
import { Observable } from "rxjs/Observable";
import { Event }      from '../model/event';


const SERVER_URL  = 'http://localhost:8080';

@Injectable()
export class SocketService {
  private socket;

  constructor() {
  }

  public initSocket(): void {
    this.socket = io(SERVER_URL);
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

}
