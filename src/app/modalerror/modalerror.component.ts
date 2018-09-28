import { Component, OnInit, ViewChild, Injectable, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalerror',
  templateUrl: './modalerror.component.html',
  styleUrls: ['./modalerror.component.css']
})

export class ModalerrorComponent implements OnInit {
  @ViewChild('errorcontent') errorcontent;
  @Input() name;
  @Input() errorMessage;
  constructor(public activeModal: NgbActiveModal) { }
  ngOnInit() {
  }

  public allerta(){
    alert('ciao')
  }

  // Method to show a modal if an error happened (e.g. comunication error)
  //showError(code: string, message: string) {
 //   this.errorMessage = message;
 //   this.modalService.open(this.errorContent, { centered: true });
//  }
}
