import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit {
  public actualite;

  constructor(private http : HttpClient) {
    this.http.get('/API/actualite')
             .subscribe(res => {
               this.actualite = res;
               return this.actualite.articles.map(obj => obj.isShow = false);
             });
  }

  ngOnInit() {
  }

  DeleteArticle(index : number){
    delete(this.actualite.articles[index]);
  }

}
