import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {UserCredentials} from '../../model/user-credentials';
import {ResponseMessage} from '../../model/response-message';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  public authenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  createAccount(user: UserCredentials) {
    return this.http.post(AppComponent.API_URL + '/users/register', user)
      .pipe(tap((resp) => console.log(resp),
          error => {
        console.log('create acc error: ' + error);
      }));
  }

  private getHeaders(): HttpHeaders {
    const token: string = localStorage.getItem('authToken');

    const headers = new HttpHeaders().set('Authorization', 'Basic ' + token);

    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return headers;
  }

  public logIn(user: UserCredentials) {
    return this.http.post(AppComponent.API_URL + '/users/login', user)
      .pipe(tap(data => {
        const token = (<ResponseMessage>data).message;

        localStorage.setItem('authToken', <string>token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.authenticated = true;
      }, error => {
        console.log('login error: ' + error);
      }));
  }

  logOut() {
    const user: UserCredentials = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.post(AppComponent.API_URL + '/users/logout', user, {headers: this.getHeaders()}).subscribe(
      data => {
        console.log(data);
        this.authenticated = false;
      },
      error => {
        console.log('logout error: ' + error.toString());
      }
      )
      .add(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        window.location.reload();
      });
  }

}
