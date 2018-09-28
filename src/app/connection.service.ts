import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { LoginData } from 'src/app/login-data.LoginData';
import { catchError, retry } from 'rxjs/operators';
import { LoginResponse } from './login.response';
import { SignUpData } from './signUpData';
import { ModalerrorComponent } from './modalerror/modalerror.component';
import { allResolved } from 'q';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface Credentials {
  token: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  credentials: Credentials;

  message: string;
  constructor(private _http: HttpClient, private modalService: NgbModal) {
    // const modalRef = this.modalService.open(ModalerrorComponent);
    // modalRef.componentInstance.name = 'World';
    // modalRef.componentInstance.errorMessage= 'eccomi';
  }



  //Url to perform login
  loginConfigUrl = 'http://192.168.1.26:8080/login';

  //Url to perform signup
  signUpConfigUrl = 'http://192.168.1.26:8080/home/auth/signup';

  showMessage(message: string) {
    const modalRef = this.modalService.open(ModalerrorComponent);
    modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.errorMessage = message;
  }

  //Define handle error
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //  alert('An error occurred:' + error.error.message);
      // this._modalErrorComponent.showError();
      //const modalRef = this.modalService.open(ModalerrorComponent);

      this.message = 'A client-side or network error occurred. Handle it accordingly.';
      this.showMessage(this.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error.status == 403) {
        //this._modalErrorComponent.showError("403","A client-side or network error occurred. Handle it accordingly.");
        this.message = 'Non autorizzato';
        this.showMessage(this.message);
      }
      else {
        //this._modalErrorComponent.showError();
        this.message = 'Backend error';
        this.showMessage(this.message);
        //alert(

        // `Backend returned code ${error.status}, ` +
        //  `body was: ${error.error}`);
      }
    }
    // return an observable with a user-facing error message
    return throwError(

      'Something bad happened; please try again later.');

  };


  myf(msg: string) {
    this.showMessage(msg);
  }


  //POST Method to perform login
  /* login(loginData: LoginData): Observable<HttpResponse<any>> {
     return this._http.post<HttpResponse<any>>(this.loginConfigUrl, loginData, this.httpOptions).pipe(catchError(this.handleError));
   }
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    observe: 'response' as 'response'
  };

  login(loginData: LoginData): Observable<HttpResponse<any>> {
    const self = this;
    return this._http.post<HttpResponse<any>>(this.loginConfigUrl, loginData, this.httpOptions).pipe(catchError(
      function (error: HttpErrorResponse) {

        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          //  alert('An error occurred:' + error.error.message);
          // this._modalErrorComponent.showError();
          //const modalRef = this.modalService.open(ModalerrorComponent);

          this.message = 'A client-side or network error occurred. Handle it accordingly.';
          self.myf('A client-side or network error occurred. Handle it accordingly.');
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          if (error.status == 403) {
            //this._modalErrorComponent.showError("403","A client-side or network error occurred. Handle it accordingly.");
            self.myf('Non Autorizzato');

          }
          else {
            //this._modalErrorComponent.showError();
            self.myf('Backend error');
          }
        }
        // self.myf('Backend error');
        return throwError('Something bad happened; please try again later.')
      }
    ));
  }

  signup(signupData: SignUpData): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(this.signUpConfigUrl, signupData, this.httpOptions).pipe(catchError(this.handleError));
  }

  saveTokens(token: string, refreshToken: string) {
    this.credentials = { token: token, refreshToken: refreshToken };
    console.log('salvataggio');
    console.log(this.credentials.token);
    console.log(this.credentials.refreshToken);
  }
}