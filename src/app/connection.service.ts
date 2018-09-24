import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { LoginData } from 'src/app/login-data.LoginData';
import { catchError, retry } from 'rxjs/operators';
import { LoginResponse } from './login.response';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private _http: HttpClient) {
  }

  configUrl = 'http://192.168.1.26:8080/login';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json'

    })
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      alert('An error occurred:' + error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      alert(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getConfig() {
    return this._http.get(this.configUrl, { observe: 'response' });
  }

  login(loginData: LoginData): Observable<JSON> {
    return this._http.post<JSON>(this.configUrl, loginData, this.httpOptions).pipe(catchError(this.handleError));
  }



}

