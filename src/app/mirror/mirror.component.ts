import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mirror',
  templateUrl: './mirror.component.html',
  styleUrls: ['./mirror.component.css']
})
export class MirrorComponent implements OnInit {
	app1 = "<app-meteo>"
	app2 = "</app-meteo>"

  constructor() { }

  ngOnInit() {
  }

}
