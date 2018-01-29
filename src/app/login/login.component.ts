import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "./login.service";
import { MatSnackBar } from '@angular/material';

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
               public snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.loginS.logout();
  }

  RemoveNumber(){
    if((this.cmpt <=4)&&(this.cmpt >0)) {
      this.code = this.code.substr(0, this.code.length - 1);
      switch (this.cmpt) {
        case 1 : this.cercle1_Class = 'cercle'; break;
        case 2 : this.cercle2_Class = 'cercle';break;
        case 3 : this.cercle3_Class = 'cercle';break;
        case 4 : this.cercle4_Class = 'cercle'; break;
      };
      this.cmpt--;
    }
  }

  AddNumber(event) {
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
    if(this.loginS.login(c, 'token')){
      this.router.navigateByUrl('/personalize');
    }else {
      this.openSnackBar('test','tst');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      extraClasses : ['icons'],
      duration: 2000,
    });
  }

}
