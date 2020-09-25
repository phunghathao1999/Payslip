import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AccountService } from './../Service/account.service';

@Injectable()
export class UploadInterceptor implements HttpInterceptor {
    constructor(public accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.url.indexOf('/api/employees/avatar/') != -1 && this.accountService.getJwtUser()) {
            request = this.addHeaders(request);
        }
        return next.handle(request);
    }

    private addHeaders(request: HttpRequest<any>) {
        return request.clone({
            setHeaders: {
                'Content-Type': 'image/png',
            }
        });
    }
}