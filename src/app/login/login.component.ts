import { ConnectionService } from '../connection.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, RequiredValidator } from '@angular/forms';
import * as Rx from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoginData } from 'src/app/login-data.LoginData';
import { LoginResponse } from '../login.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  _email = '';
  _password = '';
  _rememberPassword = false;
  signUpPath = '/signup';
  userPagePath = '/user';

  auth = '';


  login: LoginData;
  config: LoginResponse;
  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
  }




  /* submit() { 
     this._email = '';
     this._password = '';
     this._rememberPassword = false;
     this.connectionService.getConfig().subscribe((data: Object) => this.config = {
       heroesUrl: data['heroesUrl'],
       textfile: data['textfile']
     },
     // success path
       error => alert('errore'));
     alert(this.config['heroesUrl']);
   }*/

  submit() {
    this.login = { email: this._email, password: this._password };
    this.connectionService.login(this.login).subscribe((data: JSON) => alert(data));


  }
}
