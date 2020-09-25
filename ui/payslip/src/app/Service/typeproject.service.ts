import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TypeProject } from './../Models/typeProject';
import { Pagination } from '../Models/pagination';
import { paginationList } from './../Models/paginationList';

@Injectable({
  providedIn: 'root'
})
export class TypeprojectService {

  url = 'http://localhost:8080/api/typeproject';
  constructor(private http: HttpClient){}
  
  // Get: get employees from service
    getTypeProjects(): Observable<TypeProject[]>{
      return this.http.get<TypeProject[]>(this.url)
        .pipe(
          catchError(err => {
            return throwError("Error is getTypeProjects");
          })
        );
    }

    getEmployeesPages(pagination: Pagination): Observable<paginationList<TypeProject>> {
      
      return this.http.post<paginationList<TypeProject>>(this.url+'/pages', pagination)
      .pipe(
        catchError(err => {
          return throwError("Error is getEmployeePost");
        })
      );
    }
  
  // Get: get employee from service with key search
    searchEmployees(term: string): Observable<TypeProject[]> {
      term = term.trim();

      // Add safe, URL encoded search parameter if there is a search term
      const options = term ?
      { params: new HttpParams().set('fullName', term) } : {};

      return this.http.get<TypeProject[]>(this.url+'/search', options)
      .pipe(
        catchError(err => {
          return throwError("Error is getEmployee with key");
        })
      );
    }
  
  // Post: add new employee to the database
    addEmployee (typeProject: TypeProject): Observable<TypeProject> {
      return this.http.post<TypeProject>(this.url, typeProject)
      .pipe(
        catchError(err => {
          return throwError("Error is addEmployee");
        })
      );
    }
  
  // Delete: delete employee from the service
    deleteEmployee (id: number): Observable<{}> {
      const url = `${this.url}/${id}`; // DELETE api/heroes/42
      return this.http.delete(url)
        .pipe(
          catchError(err => {
            return throwError("Error is deleteEmployee");
          })
        );
    }
  /** Put: update employee on the server. Returns the updated employee upon success. */
  updateEmployee (typeProject: TypeProject): Observable<TypeProject> {
    const id = typeProject.id;
    return this.http.put<TypeProject>(this.url + "/" + id , typeProject)
      .pipe(
        catchError(err => {
          return throwError("Error is updateEmployee");
        })
      );
  }
}
