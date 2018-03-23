import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SERIAL_NUMBER } from "../../assets/config";
import { AlertService } from "../_tools/alert/alert.service";
import * as shajs from 'sha.js';




@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  mdp      : string = '';
  verifmdp : string;
  email    : string;
  oldemail : string = '';
  serial_number = SERIAL_NUMBER;

  constructor( private http : HttpClient, private alertService : AlertService) { }

  ngOnInit() {
    this.http.get('/API/get_mirror', { params : { serial_number :  SERIAL_NUMBER } })
      .subscribe( data => {
      let response = JSON.stringify(data);
      let res = JSON.parse(response);
      this.oldemail = res.email;
      return this.email = res.email;
    });
  }

  updateMirror(){
    if (!(this.mdp === '') && !(this.verifmdp === '')) {
      if((Number(this.mdp)) && (Number(this.verifmdp))){
        if(this.mdp === this.verifmdp){
          const hashpassword = shajs('sha256').update(this.mdp).digest('hex');
          const options = {
            params : {
              serial_number : SERIAL_NUMBER,
              password      : hashpassword,
              email         : this.email
            }
          };
          this.http.get('/API/updateMirror', options)
          .subscribe( data => {
              this.mdp = '';
              this.verifmdp = '';
              this.alertService.success('les information ont été modifié');
            },
            error => this.alertService.error(error));
        } else {
          this.alertService.error('Les deux mots de passe remplie ne sont pas identique');
        }
      } else {
        this.alertService.error('Veuillez remplir les champs mot de passe avec des nombres');
      }
    } else {
      //check si pas vide et si l'email a changé
      if (this.email !== '' && this.email !== this.oldemail){
        //update sans MDP
        const options = {
          params : {
            'serial_number' : SERIAL_NUMBER,
            'email'         : this.email
          }
        };
        this.http.get('/API/updateMirror', options)
        .subscribe( data => this.alertService.success('les information ont été modifié'));
      } else
      this.alertService.error('Veuillez remplir tous les champs avant de valider');
    }
  }

}
