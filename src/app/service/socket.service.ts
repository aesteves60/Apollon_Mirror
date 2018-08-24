import { Injectable }  from '@angular/core';
import * as io         from 'socket.io-client';
import { Observable }  from "rxjs/Observable";
import { Event }       from '../model/event';
import { Config }      from "../../assets/config";
import { Router }      from "@angular/router";


@Injectable()
export class SocketService {
  private socket;

  constructor(private router: Router) {
    this.initSocket();
    this.onEventRouter();
  }

  public initSocket(): void {
    this.socket = io('http://' + document.location.hostname + ':3000');
  }

  public onShowActu(): Observable<number> {
    return new Observable<number>((observable) => {
      this.socket.on(Event.SHOW_ARTICLE, (index) => observable.next(index))
    })
  }

  public onShowActuEquipe(): Observable<number> {
    return new Observable<number>((observable) => {
      this.socket.on(Event.SHOW_ARTICLE_EQUIPE, (index) => observable.next(index))
    })
  }

  public onUpOrDownVolume(): Observable<string> {
    return new Observable<string>((observable) => {
      this.socket.on(Event.UPORDOWN_VOLUME, (value) => observable.next(value))
    })
  }

  public onSetVolume(): Observable<number> {
    return new Observable<number>((observable) => {
      this.socket.on(Event.CHANGE_VOLUME, (volume) => observable.next(volume))
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
    this.socket.on(Event.CHANGE_MODULE, (res) => {
      this.router.navigateByUrl(res['moduleId']);
      setTimeout(()=> this.router.navigateByUrl('mirror'), 300000)
    });
  }


}
