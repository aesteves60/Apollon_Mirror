import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-lequipe',
  templateUrl: './lequipe.component.html',
  styleUrls: ['./lequipe.component.css']
})
export class LequipeComponent implements OnInit {

  public articles;


  constructor(private http : HttpClient) {
    this.http.get('/API/lequipe')
      .subscribe(res => {
        this.articles = res['articles'];
        return this.articles.map(obj => obj.isShow = false);
      });
  }

  ngOnInit() {
  }

  DeleteArticle(index : number){
    delete(this.articles[index]);
  }

}
