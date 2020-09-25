import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap, map } from 'rxjs/operators';

import {Payslip } from './../Models/payslip';
import { Pagination } from '../Models/pagination';
import { paginationList } from '../Models/paginationList';

@Injectable({
    providedIn: 'root'
})

export class PayslipService {
    url = "http://localhost:8080/api/employees";

    constructor(
        private http: HttpClient,
    ) {}

    getPayslips(): Observable<Payslip[]>{
        return this.http.get<Payslip[]>(this.url)
            .pipe(
                catchError(() => {
                return throwError("Error method getPayslips");
                })
            );
    }

    getPagePayslips(pagination: Pagination): Observable<paginationList<Payslip>> {
        return this.http.get<paginationList<Payslip>>(this.url + '/page')
        .pipe(
            map((data: any) => {
              return{
                ...data,
                pageOfItems: data.payslip,
              }
            }),
            catchError(() => {
              return throwError("Error method getEmployeesPages");
            })
        )
    }

    addPayslip(payslip: Payslip): Observable<Payslip> {
        return this.http.post<Payslip>(this.url, payslip)
        .pipe(
            catchError(() => {
                return throwError("addPayslip");
            })
        )
    }

    deletePayslip(id: number): Observable<{}> {
        const url = `${this.url}/${id}`;
        return this.http.delete(url)
        .pipe(
            catchError(err => {
            return throwError("Error is deletePayslip");
            })
        );
    }

    updatePayslip(payslip: Payslip): Observable<Payslip> {
        const id = payslip.idPayslip;
        const url = `${this.url}/${id}`;
        return this.http.put<Payslip>(url, payslip)
        .pipe(
            catchError(err => {
            return throwError("Error is updatePayslip");
            })
        );
    }
}