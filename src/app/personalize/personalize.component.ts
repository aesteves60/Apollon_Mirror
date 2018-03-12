import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.css']
})
export class PersonalizeComponent implements OnInit {

  public ItemMirrorUpLeft     = [];
  public ItemMirrorUpRight    = [];
  public ItemMirrorLeft       = [];
  public ItemMirrorRight      = [];
  public ItemMirrorDownRight  = [];
  public ItemMirrorDown1      = [];
  public ItemMirrorDown2      = [];
  public ItemMirrorDownLeft   = [];
  public modules = {};

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.get_Modules();
  }

  public get_Modules(){
    this.http.get('/API/get_modules').subscribe(res => this.modules = res);
  }

}
