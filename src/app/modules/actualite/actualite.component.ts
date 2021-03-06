import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../../core/socket.service';
import { ArticleService } from './article.service';

@Component({
    selector: 'app-actualite',
    templateUrl: './actualite.component.html',
    styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit {
    public articles;

    constructor(private socket$: SocketService,
        private router: Router,
        private article$: ArticleService) {
    }

    ngOnInit() {
        this.article$.getArticleActu().subscribe(res => this.articles = res);
        this.socket$.initSocket();

        this.socket$.onShowActu().subscribe((index) => this.ShowArticle(index['actuId'] - 1));
    }

    DeleteArticle(index: number) {
        delete (this.articles[index]);
    }

    ShowArticle(index: number) {
        this.articles[index].isShow = !this.articles[index].isShow;
    }
}
