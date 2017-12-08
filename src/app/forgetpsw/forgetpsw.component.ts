import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


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

  constructor( private http: HttpClient, public snackBar: MatSnackBar) { }

  openSnackBar(_message: string, action: string) {
    this.snackBar.open(_message, action, {
      duration: 4000,
    });
    this.EnvoiEmail();
  }

  EnvoiEmail(){
  	this.http.get(this.URL_API)
    		 .subscribe(data => 
    		 this.reponse = data
    		 );
    console.log('ok');
  }


  ngOnInit() {
  }

}
