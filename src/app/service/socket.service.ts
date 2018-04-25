import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private url = 'http://localhost:8080';
  private socket;
  private selectedArticle = null;

   constructor() {
  }

  gettest(){
    /*this.socket.emit('test','test');
    console.log(this.socket);
    this.socket.on('test', (message) => {
        alert('emit ok ');
    });*/
   }
}
