import { Component, OnInit } from '@angular/core';
import * as shajs            from 'sha.js';
import { AlertService }      from "../../service/alert/alert.service";
import { GoogleAuthService } from "../../auth/authGoogle.service";
import { MirrorService }     from "../../service/mirror.service";
import { UserService }       from "../../service/user.service";
import { Config }            from '../../../environments/config';
import { User }              from "../../model/user";

@Component({
  selector   : 'app-account',
  templateUrl: './account.component.html',
  styleUrls  : ['./account.component.css']
})
export class AccountComponent implements OnInit {

  serial_number    = Config.SERIAL_NUMBER;
  mdp: string      = '';
  verifmdp: string = '';
  mail: string    = '';
  oldemail: string = '';
  user: User;
  // TODO trop de requete HTTP identique ici

  constructor(private mirrorService: MirrorService,
              private alertService: AlertService,
              private googleAuthService: GoogleAuthService,
              private user$: UserService) { }

  ngOnInit() {
    this.mirrorService.getMirror().subscribe(res => {
      this.oldemail = res['email'];
      this.mail    = res['email'];
    });
    this.user$.getUser().subscribe(user => this.user = user);

    this.user = this.user$.user;
  }

  signIn(): void {
    this.googleAuthService.signIn()
        .then(() => this.alertService.success("Connexion reussi"))
        .catch((e) => this.alertService.error("Une erreur est survenu", e));
  }

  signOut(): void {
    this.googleAuthService.signOut()
        .then(() => this.alertService.success("Deconnexion reussi"))
        .catch((e) => this.alertService.error("Une erreur est survenu", e))
  }

  updateMirror(): void {
    if(!this.checkEmail && !this.checkPassword) {
      const hashpassword = shajs('sha256').update(this.mdp).digest('hex');
      this.mirrorService.updateMirror(this.mail, hashpassword).subscribe(() => {
        this.mdp      = '';
        this.verifmdp = '';
        this.alertService.success('Les informations ont été modifiées.');
      }, error => this.alertService.error(error));
    } else {
      //check si pas vide et si l'email a changé
      if(!this.checkEmail() && this.mail !== this.oldemail) {
        //update sans MDP
        this.mirrorService.updateMirror(this.mail, null)
            .subscribe(() => this.alertService.success('Les informations ont été modifiées.'));
      } else this.alertService.error('Veuillez remplir tous les champs avant de valider.');
    }
  }

  private checkPassword(): boolean {
    if(!(this.mdp === '') && !(this.verifmdp === '')) {
      if((Number(this.mdp)) && (Number(this.verifmdp))) {
        if(this.mdp === this.verifmdp) {
          return true;
        }
      } else {
        this.alertService.error('Les deux mots de passe ne sont pas identiques.');
        return false;
      }
    } else {
      this.alertService.error('Veuillez remplir les champs mot de passe avec des chiffres.');
      return false;
    }
  }

  private checkEmail(): boolean {
    if(this.mail !== '') {
      return true;
    } else {
      this.alertService.error('Veuillez remplir tous les champs avant de valider.');
      return false;
    }
  }


}
