import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { AlertService } from '../shared/alert/alert.service';
import { environment } from '../../environments/environment';

const serialNumber = environment.serialNumber;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public cmpt = 0;
    public code = '';
    public cercle1_Class = 'cercle';
    public cercle2_Class = 'cercle';
    public cercle3_Class = 'cercle';
    public cercle4_Class = 'cercle';

    constructor(private router: Router, private loginS: LoginService,
        private alertService: AlertService, private http: HttpClient) { }

    ngOnInit() {
        this.loginS.logout();
    }

    ForgetPassword() {
        this.http.get('/apipollon/forgetpsw', { params: { serial_number: serialNumber } }).subscribe(ok => {
            this.alertService.error('Un email avec votre nouveau mot de passe vous a été envoyé');
        });
    };

    RemoveCmpt() {
        if ((this.cmpt <= 4) && (this.cmpt > 0)) {
            this.code = this.code.substr(0, this.code.length - 1);
            switch (this.cmpt) {
                case 1: this.cercle1_Class = 'cercle'; break;
                case 2: this.cercle2_Class = 'cercle'; break;
                case 3: this.cercle3_Class = 'cercle'; break;
                case 4: this.cercle4_Class = 'cercle'; break;
            }
            this.cmpt--;
        }
    }

    AddCmpt(event) {
        if ((this.cmpt < 4) && (this.cmpt >= 0)) {
            this.cmpt++;
            switch (this.cmpt) {
                case 1: this.cercle1_Class = 'cercle_rempli'; break;
                case 2: this.cercle2_Class = 'cercle_rempli'; break;
                case 3: this.cercle3_Class = 'cercle_rempli'; break;
                case 4: this.cercle4_Class = 'cercle_rempli'; break;
            }
            this.code = this.code + event.target.innerText;
        }
        if (this.cmpt === 4) {
            this.CheckPassword(this.code);
        }
    }

    CheckPassword(code: string) {
        this.loginS.login(code, 'token').subscribe(
            result => {
                if (result === true) {
                    return this.alertService.success('Connexion réussie')
                }
                return this.WrongPassword();
            },
            error => this.WrongPassword());
    }

    WrongPassword() {
        this.alertService.error('Le mot de passe est erroné');
        this.cmpt = 0;
        this.code = '';
        this.cercle1_Class = 'cercle';
        this.cercle2_Class = 'cercle';
        this.cercle3_Class = 'cercle';
        this.cercle4_Class = 'cercle';
    }
}
