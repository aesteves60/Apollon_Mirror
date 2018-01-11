import { Component, OnInit } from '@angular/core';
import { ModalService } from "../modal/modal.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  modalId     : String = 'hoplaModal';
	email       : String;
	password    : String;
	datecreate  : String;

  constructor( public modalService: ModalService ) { }

  ngOnInit() {
  }

}
