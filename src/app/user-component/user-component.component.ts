import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {
  logoutPath: string = '/user';
  closeResult: string;

  constructor(private modalService: NgbModal, private router: Router) { }
  ngOnInit() { }

  showModal(content) {
    this.modalService.open(content, { centered: true });
  }

  logout(content) {
    // Close the modal window
    this.modalService.dismissAll(content);
    // Go to the login page
    this.router.navigate(['/login'])
  }
}