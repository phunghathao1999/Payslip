import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Employee } from '../Models/employee';
import { Pagination } from '../Models/pagination';
import { paginationList } from '../Models/paginationList';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  url = 'http://localhost:8080/api/employees';
  constructor(private http: HttpClient){}
  
  // Get: get employees from service
    getEmployees(): Observable<Employee[]>{
      return this.http.get<Employee[]>(this.url + '/', {  })
        .pipe(
          catchError(err => {
            return throwError("Error method getEmployee");
          })
        );
    }

    // Get: get employee with username from service
    getEmployee(email: string): Observable<Employee>{
      return this.http.post<Employee>(this.url + '/email', email)
        .pipe(
          catchError(err => {
            return throwError("Error method getEmployee");
          })
        );
    }

    getEmployeesPages(pagination: Pagination): Observable<paginationList<Employee>> {
      
      return this.http.post<paginationList<Employee>>(this.url+'/pages', pagination)
        .pipe(
          map((data: any) => {
            return{
              ...data,
              pageOfItems: data.employee,
            }
          }),
          catchError(err => {
            return throwError("Error method getEmployeesPages");
          })
        )
    }
  
  // Get: get employee from service with key search
    searchEmployees(term: string): Observable<Employee[]> {
      term = term.trim();

      // Add safe, URL encoded search parameter if there is a search term
      const options = term ?
      { params: new HttpParams().set('fullName', term) } : {};

      return this.http.get<Employee[]>(this.url+'/search', options)
      .pipe(
        catchError(err => {
          return throwError("Error method getEmployee with key");
        })
      );
    }
  
  // Post: add new employee to the database
    addEmployee (employee: Employee): Observable<Employee> {
      return this.http.post<Employee>(this.url + "/create", employee)
      .pipe(
        catchError(err => {
          return throwError("Error method addEmployee");
        })
      );
    }
  
  // Delete: delete employee from the service
    deleteEmployee (id: number): Observable<{}> {
      const url = `${this.url}/${id}`;
      return this.http.delete(url)
        .pipe(
          catchError(err => {
            return throwError("Error is deleteEmployee");
          })
        );
    }
  /** Put: update employee on the server. Returns the updated employee upon success. */
    updateEmployee (employee: Employee): Observable<Employee> {
      const id = employee.id;
      const url = `${this.url}/${id}`;
      return this.http.put<Employee>(url, employee)
        .pipe(
          catchError(err => {
            return throwError("Error is updateEmployee");
          })
        );
    }
  
    getAvatar(email: string): Observable<ImageData> {
      return this.http.get<any>(this.url + '/avatar/' + email)
        .pipe(
          tap(account => {
            console.log(account);
          }),
          catchError(() => {
            return throwError("Error is getavatar");
          })
        )
    }
}
