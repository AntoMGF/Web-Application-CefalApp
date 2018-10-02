import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, RequiredValidator } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { SignUpData } from '../signUpData';
import { ConnectionService } from '../connection.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  _name: string = '';
  _surname: string = '';
  _date: NgbDateStruct;
  _email: string = '';
  _gender: string = 'Male';
  _state: string = '';
  _city: string = '';
  _address: string = '';
  _telephone: string = '';
  _password: string = '';
  _confirmPassword: string = '';

  signUpData: SignUpData;

  constructor(private connectionService: ConnectionService, private router: Router,private modalService: NgbModal) { }
v
  ngOnInit() {
  }

  @ViewChild('content') content;

  setradio(gender: string) {
    this._gender = gender;
  }

  validPassword(): boolean {
    if (this._password != null && this._confirmPassword != null && this._password != '' && this._confirmPassword != ''
     && this._password === this._confirmPassword) 
     {
      return true;
    }
    return false;
  }
  submit() {
    this.signUpData = {
      name: this._name, lastname: this._surname, email: this._email, birthday: '' + '2018-09-05',
      password: this._password, gender: this._gender, nationality: this._state, city: this._city, address: this._address,
      telephone: this._telephone, rolesIdentify: "USER"
    }


    this.connectionService.signup(this.signUpData).subscribe((res: HttpResponse<any>) => {
      //Save the last saved credentials (i will come back in the login page and i wil automatically put them in the input fields)
      this.connectionService.saveLastRegisteredCredentials(this._email, this._password);
      this.showModal(this.content);
      // Move to the login page
      this.router.navigate(['/login']);
    });
  }

  // Method to show a modal if registration was successfull
  showModal(content) {
    this.modalService.open(content, { centered: true });
  }
}