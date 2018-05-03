import {Injectable}   from '@angular/core';
import * as io        from 'socket.io-client';
import { Observable } from "rxjs/Observable";
import { Event }      from '../model/event';
import { Config }     from "../../assets/config";


@Injectable()
export class SocketService {
  private socket;

  constructor() {
    this.initSocket()
  }

  public initSocket(): void {
    this.socket = io(Config.SERVER_SOCKETIO);
  }

  public OnShowActu(): Observable<number> {
    return new Observable<number>((observable) => {
      this.socket.on(Event.SHOW_ARTICLE, (index) => observable.next(index))
    })
  }

  public doEmit(event: Event, param: Object = null): void {
    this.socket.emit(event, param);
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

}
