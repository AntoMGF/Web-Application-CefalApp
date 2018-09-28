import { ConnectionService } from '../connection.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, RequiredValidator } from '@angular/forms';
import * as Rx from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoginData } from 'src/app/login-data.LoginData';
import { LoginResponse } from '../login.response';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../user.service';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { ModalerrorComponent } from '../modalerror/modalerror.component';



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


  login: LoginData;
  config: LoginResponse;
  constructor(private connectionService: ConnectionService, private userService: UserService) { }

  ngOnInit() {
    // Clear all the variables to login again
    this._email = '';
    this._password = '';
    this._rememberPassword = false;
    this.userService.authenticated = false;
  }

  submit() {

    this.login = { email: this._email, password: this._password };
    this.connectionService.login(this.login).subscribe((res: HttpResponse<any>) => {
      this.connectionService.saveTokens(res.headers.get('Authorization'), res.headers.get('Refresh'));
      alert(res.headers.get('Authorization'))
      this.userService.authenticated = true;
    }
    
    );
  }
}