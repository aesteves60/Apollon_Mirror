import { Injectable }  from '@angular/core';
import * as io         from 'socket.io-client';
import { Observable }  from "rxjs/Observable";
import { Event }       from '../model/event';
import { Config }      from "../../assets/config";
import { EventRouter } from "../model/eventRouter";
import { Router }      from "@angular/router";


@Injectable()
export class SocketService {
  private socket;

  constructor(private router: Router) {
    this.initSocket();
    this.onEventRouter();
  }

  public initSocket(): void {
    this.socket = io(Config.SERVER_SOCKETIO);
  }

  public OnShowActu(): Observable<number> {
    return new Observable<number>((observable) => {
      this.socket.on(Event.SHOW_ARTICLE, (index) => observable.next(index))
    })
  }

  public doEmit(event: Event, param: any = null): void {
    this.socket.emit(event, param);
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

  public onEventRouter(): void {
    this.socket.on(EventRouter.ACTU, () => this.router.navigateByUrl(EventRouter.ACTU));
    this.socket.on(EventRouter.EQUIPE, () => this.router.navigateByUrl(EventRouter.EQUIPE));
    this.socket.on(EventRouter.CALENDAR, () => this.router.navigateByUrl(EventRouter.CALENDAR));
    this.socket.on(EventRouter.GMAIL, () => this.router.navigateByUrl(EventRouter.GMAIL));
    this.socket.on(EventRouter.METEO, () => this.router.navigateByUrl(EventRouter.METEO));
    this.socket.on(EventRouter.RADIO, () => this.router.navigateByUrl(EventRouter.RADIO));
    this.socket.on(EventRouter.TRAFIC, () => this.router.navigateByUrl(EventRouter.TRAFIC));
    this.socket.on(EventRouter.MIRROR, () => this.router.navigateByUrl(EventRouter.MIRROR));
  }


}
