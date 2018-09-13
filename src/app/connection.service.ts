import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private _http: HttpClient) {
  }

  configUrl = 'assets/files/configFile.json';

  getConfig() {
    return this._http.get(this.configUrl);
  }


  public login() {

  }
}

