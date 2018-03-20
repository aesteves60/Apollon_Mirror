import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { AlertService } from "./alert/alert.service";


@Injectable()
export class SocketService {
  private url = 'http://localhost:8084';  
  private socket;

   constructor(private alertService : AlertService) {
   		this.socket = io(this.url);
   		this.socket.on('message', (data) => {
       		console.log('test');
      	});
  }

  sendMessage(message){
    this.socket.emit('add-message', message);    
  }
 
}