import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../shared/alert/alert.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent {

    firstname = '';
    lastname = '';
    email = '';
    subject = '';

    constructor(private http: HttpClient, private alertService: AlertService) { }

    Send() {
        const options = {
            params: {
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                subject: this.subject
            }
        };
        this.http.get('/contact', options).subscribe(() => {
            this.firstname = '';
            this.lastname = '';
            this.email = '';
            this.subject = '';
            this.alertService.success('Votre demande a été envoyée');
        });
    }

}
