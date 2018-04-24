import { Component } from '@angular/core';

// You may not have this explicit reference.
/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
declare var gapi : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){ }
}
