import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AccountService } from '../Service/account.service';
import { Observable } from 'rxjs';

@Injectable()
export class CookieInterceptor implements HttpInterceptor {

  constructor(public accountService: AccountService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials:true
    });
    if (this.accountService.getJwtUser()) {
      request = this.addHeaders(request);
    }
    return next.handle(request);
  }

  private addHeaders(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        'Content-Type':  'application/json',
      }
    });
  }
}
