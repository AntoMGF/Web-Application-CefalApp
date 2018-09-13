import {Component, OnInit} from '@angular/core';
import {NgForm, RequiredValidator} from '@angular/forms';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

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
  constructor() {}

  ngOnInit() {
  }

  setradio(gender: string) {
    this._gender = gender;
  }

  submit() {
    alert('Name: ' + this._name + 'Surname: ' + this._surname + 'Date: ' + this._date.day + 'Email: ' + this._email + 'Gender: ' + this._gender +
       'State: ' + this._state + 'City: ' + this._city +'Address: ' + this._address +'Telephone: ' + this._telephone +'Password: ' + this._password + 'Confirm Password: ' + this._confirmPassword);
  }
}