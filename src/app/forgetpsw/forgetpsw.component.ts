import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-forgetpsw',
  templateUrl: './forgetpsw.component.html',
  styleUrls: ['./forgetpsw.component.css']
})
export class ForgetPswComponent implements OnInit {
  //erreurControl
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  matcher = new MyErrorStateMatcher();

	message = "Un email vous a été envoyé pour modifier votre mot de passe";
	URL_API = "http://localhost/get/forgetpsw";
	reponse ;
  @Input() email: String;

  constructor( private http: HttpClient) { }


  EnvoiEmail(){
  	this.http.get('/forgetpsw').subscribe(data =>
    		  this.reponse = data
    		);
  }

  ngOnInit() {

  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
