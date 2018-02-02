import { Component, OnInit } from '@angular/core';
import { AlertService } from "../alert.service";
import {Alert} from "./alert";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alerts: Alert[] = [];

  constructor( private alertService :AlertService ) {
    this.alertService.getMessage().subscribe(alerts => {
      if (!alert) {
        // clear alerts when an empty alert is received
        this.alerts = [];
        return;
      }
      this.alerts.push(alerts);
    });
  }

  ngOnInit() {

  }

}
