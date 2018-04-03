import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-lequipe',
  templateUrl: './lequipe.component.html',
  styleUrls: ['./lequipe.component.css']
})
export class LequipeComponent implements OnInit {

  public lequipe;


  constructor(private http : HttpClient) {
    this.http.get('/API/lequipe')
      .subscribe(res => {
        this.lequipe = res;
        return this.lequipe.articles.map(obj => obj.isShow = false);
      });
  }

  ngOnInit() {
  }

  DeleteArticle(index : number){
    delete(this.lequipe.articles[index]);
  }

}
