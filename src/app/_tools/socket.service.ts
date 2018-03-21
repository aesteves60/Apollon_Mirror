import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {AlertService} from './alert/alert.service';


@Injectable()
export class SocketService {
  private url = 'http://localhost:8080';
  private socket;

   constructor(private alertService : AlertService) {
   	  this.socket = io(this.url);
   		this.socket.on('connexion', (socket) => {
       		console.log('connexion');
       		socket.on('test', () => {
            this.alertService.success('emit broadcast test ok ');
          })
      	});
  }

  sendMessage(message){
    this.socket.emit('test', message);
  }

}
