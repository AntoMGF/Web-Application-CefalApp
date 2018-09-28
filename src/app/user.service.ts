import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _authenticated: boolean = true;

  constructor() { }

  public get authenticated() {
    return this._authenticated;
  }

  public set authenticated(value: boolean) {
    this._authenticated = value;
  }

}
