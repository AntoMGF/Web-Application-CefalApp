import {ConnectionService} from '../connection.service';
import {Component, OnInit} from '@angular/core';
import {NgForm, RequiredValidator} from '@angular/forms';
import * as Rx from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  _email = '';
  _password = '';
  _rememberPassword = false;
  signUpPath='/signup';
  userPagePath='';
  private config: Object;

  constructor(private connectionService: ConnectionService) {}

  ngOnInit() {
  }

  submit() { 
    alert(this._email + ' '+ this._password + ' '+ this._rememberPassword );
    this.userPagePath='/user';   
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
  }
}
