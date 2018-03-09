import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "./login.service";
import { AlertService } from "../_tools/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public cmpt : number =0;
  public code : string ="";
  public cercle1_Class = 'cercle';
  public cercle2_Class = 'cercle';
  public cercle3_Class = 'cercle';
  public cercle4_Class = 'cercle';

  constructor( private router: Router, private loginS: LoginService,
               private alertService: AlertService) {

  }

  ngOnInit() {
    this.loginS.logout();
  }

  RemoveCmpt(){
    if((this.cmpt <=4)&&(this.cmpt >0)) {
      this.code = this.code.substr(0, this.code.length - 1);
      switch (this.cmpt) {
        case 1 : this.cercle1_Class = 'cercle'; break;
        case 2 : this.cercle2_Class = 'cercle';break;
        case 3 : this.cercle3_Class = 'cercle';break;
        case 4 : this.cercle4_Class = 'cercle'; break;
      }
      this.cmpt--;
    }
  }

  AddCmpt(event) {
    if((this.cmpt <4)&&(this.cmpt >=0)) {
      this.cmpt++;
      switch (this.cmpt) {
        case 1 : this.cercle1_Class = 'cercle_rempli'; break;
        case 2 : this.cercle2_Class = 'cercle_rempli'; break;
        case 3 : this.cercle3_Class = 'cercle_rempli'; break;
        case 4 : this.cercle4_Class = 'cercle_rempli'; break;
      }
      this.code = this.code + event.toElement.innerText;
    }
    if (this.cmpt == 4){
      this.CheckPassword(this.code);
    }
  }

  CheckPassword( c : string){
    this.loginS.login(c, 'token')? this.alertService.success('Connexion reussi') : this.WrongPassword();
  }

  WrongPassword() {
    this.alertService.error('Wrong password');
    this.cmpt = 0 ;
    this.code = '';
    this.cercle1_Class = 'cercle';
    this.cercle2_Class = 'cercle';
    this.cercle3_Class = 'cercle';
    this.cercle4_Class = 'cercle';
  }

}
