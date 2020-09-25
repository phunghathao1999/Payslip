import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';

import { EmployeeService } from './../../Service/employee.service';
import { Employee } from './../../Models/employee';
import { Pagination } from '../../Models/pagination';
import { paginationList } from './../../Models/paginationList';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { UpdateemployeeComponent } from './updateemployee/updateemployee.component';
import { DeleteemployeeComponent } from './deleteemployee/deleteemployee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

    employees: paginationList<Employee>;
    keySearch = '';
    pagination: Pagination = { searchValue: '', currentPage: 0, pageSize :10, sort: 'ASC', sortKey: 'fullName' } as Pagination;
    displayedColumns: string[] = ['ID', 'fullName', 'telephone', 'email', 'birthday', 'joinDay', 'status', 'edit', 'delete'];

    setPage(currentPage: number){
      this.pagination.currentPage = currentPage;
      this.getEmployees();
    }

    sort(key: string){
      this.pagination.sortKey = key;
      this.pagination.sort == 'ASC' ? this.pagination.sort = 'DESC' : this.pagination.sort = 'ASC';
      this.pagination.currentPage = 0;
      this.setPage(this.pagination.currentPage);
    }

    pagaSize(key: number){
      this.pagination.pageSize = key;
      this.pagination.currentPage = 0;
      this.setPage(this.pagination.currentPage);
    }

    dialogAddEmployee() {
      let dialogRef = this.dialog.open(AddemployeeComponent, {
        height: '490px',
        width: '750px',
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.setPage(0);
        }
      });
    }

    dialogUpdateEm(employee: Employee) {
      let dialogRef = this.dialog.open(UpdateemployeeComponent, {
        height: '430px',
        width: '630px',
        data: employee,
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.employees.pageOfItems.push(result);
        }
      });
    }

    dialogDeleteEm(employee: Employee) {
      let dialogRef = this.dialog.open(DeleteemployeeComponent, {
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.delete(employee);
        }
      })
    }

    getEmployees(): void {
      this.employeeService.getEmployeesPages(this.pagination)
        .subscribe(paginationlist => this.employees = paginationlist);
    }

    delete(deleteEmployee: Employee): void {
      this.employees.pageOfItems = this.employees.pageOfItems.filter(h => h !== deleteEmployee);
      this.employeeService
        .deleteEmployee(deleteEmployee.id)
        .subscribe();
    }

    searchEmployee() {
        this.pagination.searchValue = this.keySearch;
        this.pagination.currentPage = 0;
        this.setPage(this.pagination.currentPage);
    }

    constructor(
      private employeeService: EmployeeService,
      public dialog: MatDialog
    ) { }

    ngOnInit(): void {
      this.setPage(this.pagination.currentPage);
    }

}

