import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-actualiter',
  templateUrl: './actualiter.component.html',
  styleUrls: ['./actualiter.component.css']
})
export class ActualiterComponent implements OnInit {
  public articles;
  private url = 'http://localhost:8080';
  public socket;

  constructor(private http : HttpClient) {
    this.http.get('/API/actualite')
             .subscribe(res => {
               this.articles = res['articles'];
               return this.articles.map(obj => obj.isShow = false);
             });
    this.socket = io(this.url);
  }

  ngOnInit() {
    this.socket.on('actu', (response) => {
      console.log(response.actuId);
      this.ShowArticle(parseInt(response.actuId) - 1);
    });
  }

  DeleteArticle(index : number){
    delete(this.articles[index]);
  }

  ShowArticle(index : number){
    this.articles[index].isShow = true;
  }

}
