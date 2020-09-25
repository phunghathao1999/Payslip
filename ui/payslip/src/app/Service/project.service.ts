import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Project } from './../Models/project';
import { paginationList } from './../Models/paginationList';
import { Pagination } from '../Models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url =  'http://localhost:8080/api/project';
  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this.url + '/', {  })
    .pipe(
      catchError(err => {
        return throwError("Error method getPageProject");
      })
    )
  }
  getPageProject (pagination: Pagination): Observable<paginationList<Project>> {
    return this.http.post<paginationList<Project>>(this.url+'/pages', pagination)
      .pipe(
        map((data: any) => {
          return{
            ...data,
            pageOfItems: data.Project,
          }
        }),
        catchError(err => {
          return throwError("Error method getPageProject");
        })
      )
  }

  addProject (project: Project): Observable<Project> {
    return this.http.post<Project>(this.url + "/create", project)
    .pipe(
      catchError(err => {
        return throwError("Error method addProject");
      })
    );
  }

  deleteEmployee (id: number): Observable<{}> {
    const url = `${this.url}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url)
      .pipe(
        catchError(err => {
          return throwError("Error method deleteProject");
        })
      );
  }

  updateProject (project: Project): Observable<Project> {
    const id = project.idProject;
    const url = `${this.url}/${id}`;
    return this.http.put<Project>(url, project)
      .pipe(
        catchError(err => {
          return throwError("Error method updateProject");
        })
      );
  }
}
