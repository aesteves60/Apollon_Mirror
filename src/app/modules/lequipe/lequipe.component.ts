import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../actualite/article.service';
import { SocketService } from '../../core/socket.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-lequipe',
    templateUrl: './lequipe.component.html',
    styleUrls: ['./lequipe.component.css']
})
export class LequipeComponent implements OnInit {

    public articles;

    constructor(private article$: ArticleService,
        private router: Router,
        private socket$: SocketService) { }

    ngOnInit() {
        this.article$.getArticleEquipe().subscribe(res => this.articles = res);
        this.socket$.initSocket();

        this.socket$.onShowActuEquipe().subscribe((index) => this.ShowArticle(index['actuId'] - 1));
    }

    DeleteArticle(index: number) {
        delete (this.articles[index]);
    }

    ShowArticle(index: number) {
        this.articles[index].isShow = !this.articles[index].isShow;
    }
}
