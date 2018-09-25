import { Component, OnInit } from '@angular/core';
import { NgForm, RequiredValidator } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { SignUpData } from '../signUpData';
import { ConnectionService } from '../connection.service';
import { HttpResponse } from '@angular/common/http';

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

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
  }

  setradio(gender: string) {
    this._gender = gender;
  }

  submit() {
    this.signUpData = {
      name: this._name, lastname: this._surname, email: this._email, birthday: '' + '2018-09-05',
      password: this._password, gender: this._gender, nationality: this._state, city: this._city, address: this._address,
      telephone: this._telephone, rolesIdentify: "USER"
    }


    this.connectionService.signup(this.signUpData).subscribe((res: HttpResponse<any>) => {
     alert('success');
      
    });
    


    alert('Name: ' + this._name + 'Surname: ' + this._surname + 'Date: ' + this._date.day + 'Email: ' + this._email + 'Gender: ' + this._gender +
      'State: ' + this._state + 'City: ' + this._city + 'Address: ' + this._address + 'Telephone: ' + this._telephone + 'Password: ' + this._password + 'Confirm Password: ' + this._confirmPassword);
  }
}