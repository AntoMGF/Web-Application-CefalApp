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
import { Router } from '@angular/router';

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

  constructor(private connectionService: ConnectionService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    // Clear all the variables to login again
    this._email = '';
    this._password = '';
    this._rememberPassword = false;
    this.userService.authenticated = false;

    // Check if i am in the login page because i was redirected after a successfull signup
    if (this.connectionService.lastRegistrationPerformed()) {
      // Put the saved variables in the input fields
      this._email = this.connectionService.getLastSavedEmail();
      this._password = this.connectionService.getLastSavedPassword();
      // Clear the last saved variables
      this.connectionService.clearLastRegisteredCredentials();
    }

    // Check if the credentials were saved in the browser
    else if (localStorage.getItem('credentials')) {
      // Retrieve data, as a JSON
      var data = JSON.parse(localStorage.getItem('credentials'));
      // Assign the saved values to the variables (and to the input fields)
      this._email = data['email'];
      this._password = data['password'];
    }
  }

  submit() {
    this.login = { email: this._email, password: this._password };
    // Save data as JSON
    var savedData = JSON.stringify(this.login);

    // Perform the login 
    this.connectionService.login(this.login).subscribe((res: HttpResponse<any>) => {
      // Save token and refresh token
      this.connectionService.saveTokens(res.headers.get('Authorization'), res.headers.get('Refresh'));
      // Check if the user wanted to save the credentials 
      if (this._rememberPassword) {
        // Save credentials
        localStorage.setItem('credentials', savedData);
      }
      else {
        // Delete credentials
        localStorage.removeItem('credentials');
      }
      // I am authenticated, i will be able to move in the user pages
      this.userService.authenticated = true;
      // Move to the user page
      this.router.navigate(['/user']);
    }
    );
  }
}