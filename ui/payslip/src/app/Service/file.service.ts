import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FileService {
    url = 'http://localhost:8080/api/file';
    constructor(
        private http: HttpClient,
    ) {}

    saveavatar(idEmployee: number, uploafile: File): Observable<boolean> {
        return this.http.post<any>(this.url + '/' + idEmployee, uploafile)
        .pipe(
            mapTo(true),
            catchError(() => {
              return of(false);
            })
        );
    }
}