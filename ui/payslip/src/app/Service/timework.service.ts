import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Pagination } from '../Models/pagination';
import { paginationList } from '../Models/paginationList';
import { TimeWork } from './../Models/timework';
import { Asignment } from '../Models/asignment';

@Injectable({
  providedIn: 'root'
})

export class timeworkService {

  url = 'http://localhost:8080/api/worktime';

  constructor(private http: HttpClient) {}

  getPageTimeWork (pagination: Pagination): Observable<paginationList<TimeWork>> {
    return this.http.post<paginationList<TimeWork>>(this.url+'/pages', pagination)
      .pipe(
        map((data: any) => {
          return {
            ...data,
            pageOfItems: data.Work,
          }
        }),
        catchError(err => {
          return throwError("Error method getPageTimeWork");
        })
      )
  }

  getTimeWorkByEmployee (asignment: Asignment): Observable<TimeWork[]> {
    return this.http.post<TimeWork[]>(this.url+'/employee', asignment)
      .pipe(
        map((data: any) => {
          return data.WorkTime
        }),
        catchError(err => {
          return throwError("Error method getTimeWorkByEmployee");
        })
      )
  }

  add (timework: TimeWork): Observable<TimeWork> {
    return this.http.post<TimeWork>(this.url + "/create", timework)
    .pipe(
      catchError(err => {
        return throwError("Error method add");
      })
    );
  }

  update (timework: TimeWork): Observable<TimeWork> {
    const id = timework.idWorktime;
    const url = `${this.url}/${id}`;
    return this.http.put<TimeWork>(url, timework)
      .pipe(
        catchError(err => {
          return throwError("Error method update");
        })
      );
  }

  delete (id: number): Observable<{}> {
    const url = `${this.url}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url)
      .pipe(
        catchError(err => {
          return throwError("Error method delete");
        })
      );
  }
}
