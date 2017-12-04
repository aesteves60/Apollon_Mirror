import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	modalId = 'hoplaModal';


  constructor(public modalService: ModalService) { }

  ngOnInit() {
  }

}
