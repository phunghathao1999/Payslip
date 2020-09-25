import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Work } from './../Models/work';
import { paginationList } from './../Models/paginationList';
import { Pagination } from '../Models/pagination';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

   url =  'http://localhost:8080/api/work';
  constructor(private http: HttpClient) { }

  getWorks(): Observable<Work[]>{
    return this.http.get<Work[]>(this.url + '/', {  })
      .pipe(
        catchError(err => {
          return throwError("Error method getwork");
        })
      );
  }
  getPageWorks (pagination: Pagination): Observable<paginationList<Work>> {
    return this.http.post<paginationList<Work>>(this.url+'/pages', pagination)
      .pipe(
        map((data: any) => {
          return{
            ...data,
            pageOfItems: data.Work,
          }
        }),
        catchError(err => {
          return throwError("Error method getPageWorks");
        })
      )
  }

  getWorkForEmployee(pagination: Pagination): Observable<paginationList<Work>> {
    return this.http.post<paginationList<Work>>(this.url + '/employee', pagination)
    .pipe(
      map((data: any) => {
        return{
          ...data,
          pageOfItems: data.Work,
        }
      }),
      catchError(err => {
        return throwError("Error method getPageWorks");
      })
    )
  }

  addWork (work: Work): Observable<Work> {
    return this.http.post<Work>(this.url + "/create", work)
    .pipe(
      catchError(err => {
        return throwError("Error method addWork");
      })
    );
  }

  deleteWork (id: number): Observable<{}> {
    const url = `${this.url}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url)
      .pipe(
        catchError(err => {
          return throwError("Error method deleteWork");
        })
      );
  }

  updateWork (work: Work): Observable<Work> {
    const id = work.idWork;
    const url = `${this.url}/${id}`;
    return this.http.put<Work>(url, work)
      .pipe(
        catchError(err => {
          return throwError("Error method updateWork");
        })
      );
  }
}
