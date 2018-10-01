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
}