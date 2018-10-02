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

  // Variable used to save the message to be shown in the modal window
  message: string;

  // Variable used to save the last registered email
  private lastSavedEmail: string = '';
  // Variable used to save the last registered password
  private lastSavedPassword: string = '';

  //Url to perform login
  loginConfigUrl = 'http://192.168.1.110:8080/login';

  //Url to perform signup
  signUpConfigUrl = 'http://192.168.1.110:8080/home/auth/signup';

  constructor(private _http: HttpClient, private modalService: NgbModal) { }

  showMessage(message: string) {
    // Code to open modal window
    const modalRef = this.modalService.open(ModalerrorComponent);
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

  showErrorModalWindow(msg: string) {
    const modalRef = this.modalService.open(ModalerrorComponent, { centered: true });
    modalRef.componentInstance.errorMessage = msg;
  }

  // HTTP options to perform post methods (login and signup)
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    observe: 'response' as 'response'
  };

  // Method to call login in the back-end
  login(loginData: LoginData): Observable<HttpResponse<any>> {
    // Save the current scope to avoid problems in the catch (which uses its own scope)
    const self = this;
    // Perform the post method
    return this._http.post<HttpResponse<any>>(this.loginConfigUrl, loginData, this.httpOptions).pipe(catchError(
      function (error: HttpErrorResponse) {

        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          self.message = 'A client-side or network error occurred. Handle it accordingly.';
        }
        else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,  
          if (error.status == 403) {
            self.message = `Backend error: Credentials are not correct`;
          }
          else {
            self.message = `${error.message}`;
          }
        }

        self.showErrorModalWindow(self.message);
        return throwError('Something bad happened; please try again later.')
      }
    ));
  }

  signup(signupData: SignUpData): Observable<HttpResponse<any>> {
    // Save the current scope to avoid problems in the catch (which uses its own scope)
    const self = this;
    return this._http.post<HttpResponse<any>>(this.signUpConfigUrl, signupData, this.httpOptions).pipe(catchError(
      function (error: HttpErrorResponse) {

        if (error.error instanceof ErrorEvent) 
        {
          // A client-side or network error occurred. Handle it accordingly.
          self.message = 'A client-side or network error occurred. Handle it accordingly.';
        }
        else 
        {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong, 
          self.message = `${error.message}`;
        }
        self.showErrorModalWindow(self.message);
        return throwError('Something bad happened; please try again later.')
      }
    ));
  }

  // Save tokens i had with successfull login
  saveTokens(token: string, refreshToken: string) {
    this.credentials = { token: token, refreshToken: refreshToken };
    console.log(this.credentials.token);
    console.log(this.credentials.refreshToken);
  }

  // Method invoked when a registration is successfull. I save the last registered email and password.
  // I need them when i am automatically redirected to the login page
  saveLastRegisteredCredentials(savedEmail: string, savedPassword: string) {
    this.lastSavedEmail = savedEmail;
    this.lastSavedPassword = savedPassword;
  }

  // Method used to check if a previous registration was performed
  lastRegistrationPerformed(): boolean {
    if (this.lastSavedEmail != '' && this.lastSavedPassword != '') {
      return true;
    }
    return false;
  }

  // Method to clear the last saved email and password (When i am redirected to the login page after i
  // registered, i put the data in the input fields in the page and i clear these variables)
  clearLastRegisteredCredentials() {
    this.lastSavedEmail = '';
    this.lastSavedPassword = '';
  }

  // Methods to return the last saved email and password
  getLastSavedEmail(): string {
    return this.lastSavedEmail;
  }

  getLastSavedPassword(): string {
    return this.lastSavedPassword;
  }
}