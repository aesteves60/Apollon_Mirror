import { Component, OnInit } from '@angular/core';
import { AlertService, Alert } from "./alert.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alerts: Alert;
  subscription: Subscription;

  constructor( private alertService :AlertService ) {
    this.subscription = this.alertService.getMessage().subscribe(alerts => this.alerts = alerts);
  }

  ngOnInit() {}

  private close(){
    this.alertService.close();
  }

}
