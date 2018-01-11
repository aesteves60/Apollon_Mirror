import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-cine',
  templateUrl: './cine.component.html',
  styleUrls: ['./cine.component.css']
})
export class CineComponent implements OnInit {
  films;

  constructor( private http: HttpClient ) { }

  ngOnInit() {
  }

}
