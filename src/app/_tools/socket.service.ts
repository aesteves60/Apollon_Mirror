import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {AlertService} from './alert/alert.service';

@Injectable()
export class SocketService {
  private url = 'http://localhost:8080';
  private socket;

   constructor(private alertService : AlertService) {
     //this.socket = io(this.url);
  }

  gettest(){
    /*this.socket.emit('test','test');
    console.log(this.socket);
    this.socket.on('test', (message) => {
        alert('emit ok ');
    });*/
   }

}
