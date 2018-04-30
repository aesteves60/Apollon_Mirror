import { Component, OnInit } from '@angular/core';
import { SERIAL_NUMBER }     from "../../../assets/config";
import * as shajs            from 'sha.js';
import { AlertService }      from "../../service/alert/alert.service";
import { GoogleAuthService } from "../../auth/authGoogle.service";
import { MirrorService }     from "../../service/mirror.service";
import { UserService }       from "../../service/user.service";


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
  user     : any;
  isLogged : boolean;

  constructor( private mirrorService : MirrorService,
               private alertService : AlertService,
               private googleAuthService: GoogleAuthService,
               private user$: UserService) { }

  ngOnInit() {
    this.mirrorService.getMirror().subscribe( res => {
      this.oldemail = res['email'];
      this.email = res['email'];
    });
    this.isLogged = this.user$.isLogged;
  }

  signOut(){
    this.googleAuthService.signOut().then(() => this.alertService.success("Deconnexion reussi"))
                                    .catch(() => this.alertService.error("Une erreur est survenu"))
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
          this.mirrorService.updateMirror(options).subscribe( () => {
              this.mdp = '';this.verifmdp = '';
              this.alertService.success('Les informations ont été modifiées.');
            }, error => this.alertService.error(error)
          );
        } else this.alertService.error('Les deux mots de passe ne sont pas identiques.');
      } else this.alertService.error('Veuillez remplir les champs mot de passe avec des chiffres.');
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
        this.mirrorService.updateMirror(options)
                          .subscribe( () => this.alertService.success('Les informations ont été modifiées.'));
      } else
      this.alertService.error('Veuillez remplir tous les champs avant de valider.');
    }
  }

}
