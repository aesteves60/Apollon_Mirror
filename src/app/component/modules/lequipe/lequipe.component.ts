import { Component, OnInit } from '@angular/core';
import { ArticleService }    from "../../../service/article.service";
import { SocketService }     from "../../../service/socket.service";

@Component({
  selector: 'app-lequipe',
  templateUrl: './lequipe.component.html',
  styleUrls: ['./lequipe.component.css']
})
export class LequipeComponent implements OnInit {

  public articles;


  constructor(private article$: ArticleService, private socket$ : SocketService) {

  }

  ngOnInit() {
    this.article$.getArticleEquipe().subscribe(res => this.articles = res);
    this.socket$.initSocket();

    let ioConnection = this.socket$.OnShowActu().subscribe((index) => this.ShowArticle(index));
  }

  DeleteArticle(index : number){
    delete(this.articles[index]);
  }

  ShowArticle(index : number){
    this.articles[index].isShow = true;
  }


}
