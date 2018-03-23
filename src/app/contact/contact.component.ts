import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AlertService} from "../_tools/alert/alert.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  firstname : string = '';
  lastname  : string = '';
  subject   : string = '';

  constructor( private http: HttpClient,  private alertService : AlertService ) { }

  ngOnInit() {

  }

  Send(){
    const options = {
      params :{
        firstname : this.firstname,
        lastname  : this.lastname,
        subject   : this.subject
      }
    };
    this.http.get('/contact', options).subscribe( ok => {
      this.firstname = '';
      this.lastname  = '';
      this.subject   = '';
      this.alertService.success('Votre demande a été envoyé');
    });
  }

}
