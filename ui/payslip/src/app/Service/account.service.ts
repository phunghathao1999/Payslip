import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

import { Account } from './../Models/account';
import { Common } from './../shared/common';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  url = 'http://localhost:8080/api/account';
  constructor(
    private http: HttpClient,
  ) {}

  login(login: Account): Observable<boolean> {
    return this.http.post<any>(`${this.url}/login`, login)
      .pipe(
        tap(account => {
          this.storeTokens(account)
        }),
        mapTo(true),
        catchError(error => {
          return of(false);
        })
      );
  }

  logout() {
    return this.http.post<any>(this.url + '/logout', {})
      .pipe(
        tap(() => {
          this.removeTokens()
        }),
        mapTo(true),
        catchError(error => {
          return of(false);
        }));
  }

  checkPassword(password: string): Observable<boolean> {
    return this.http.post<any>(this.url + "/verifypassword", password)
    .pipe(
      mapTo(true),
        catchError(error => {
          return of(false);
        })
    )
  }

  checkMail(email: string): Observable<boolean> {
    return this.http.post<any>(this.url + "/forgot", email)
    .pipe(
      mapTo(true),
        catchError(error => {
          return of(false);
        })
    )
  }

  verifyToken(tokens: string): Observable<boolean> {
    return this.http.post<any>(this.url + "/verify",tokens)
    .pipe(
      mapTo(true),
        catchError(error => {
          return of(false);
        })
    )
  }

  createPasswork(account: Account): Observable<boolean> {

    return this.http.post<any>(this.url + "/active", account)
    .pipe(
      mapTo(true),
        catchError(error => {
          return of(false);
        })
    )
  }
  
  getJwtUser() {
    return sessionStorage.getItem(Common.USER);
  }

  private storeTokens(account: Account) {
    sessionStorage.setItem(Common.USER, account.username);
    sessionStorage.setItem(Common.ROLE, account.roles);
  }

  private removeTokens() {
    sessionStorage.removeItem(Common.USER);
    sessionStorage.removeItem(Common.ROLE);
  }

}
