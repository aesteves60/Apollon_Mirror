import { Component, OnInit } from '@angular/core';
import {HttpClient}          from '@angular/common/http';
import { Event }             from '../../../model/event';
import { SocketService }     from "../../../service/socket.service";


@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit {
  public articles;


  constructor(private http : HttpClient, private socket$: SocketService) {
    this.http.get('/API/actualite')
             .subscribe(res => {
               this.articles = res['articles'];
               return this.articles.map(obj => obj.isShow = false);
             });
  }

  ngOnInit() {
    this.socket$.initSocket();

    let ioConnection = this.socket$.onEvent(Event.SHOW_ARTICLE).subscribe((index) => this.ShowArticle(index));

  }

  DeleteArticle(index : number){
    delete(this.articles[index]);
  }

  ShowArticle(index : number){
    this.articles[index].isShow = true;
  }

}
