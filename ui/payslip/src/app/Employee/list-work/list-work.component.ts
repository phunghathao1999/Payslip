import { Component, OnInit } from '@angular/core';
import { WorkService } from 'src/app/Service/work.service';
import { paginationList } from 'src/app/Models/paginationList';
import { Work } from 'src/app/Models/work';
import { Pagination } from 'src/app/Models/pagination';
import { MatDialog } from '@angular/material/dialog';
import { AddTimeWorkComponent } from './add-time-work/add-time-work.component';
import { Project } from 'src/app/Models/project';
import { ProjectService } from 'src/app/Service/project.service';
import { EmployeeService } from 'src/app/Service/employee.service';
import { Employee } from 'src/app/Models/employee';
import { AccountService } from 'src/app/Service/account.service';

@Component({
  selector: 'app-list-work',
  templateUrl: './list-work.component.html',
  styleUrls: ['./list-work.component.scss']
})
export class ListWorkComponent implements OnInit {
  
  keySearch = '';
  employee: Employee;
  projects: Project[];
  works: paginationList<Work>;
  userName = this.accountService.getJwtUser();
  pagination: Pagination = { searchValue: '', currentPage: 1, pageSize :10, sort: 'ASC', sortKey: 'summary' } as Pagination;

  search() {
    this.pagination.searchValue = this.keySearch;
    this.pagination.currentPage = 0;
    this.setPage(this.pagination.currentPage);
  }

  sort(key: string) {
    this.pagination.sortKey = key;
    this.pagination.sort == 'ASC' ? this.pagination.sort = 'DESC' : this.pagination.sort = 'ASC';
    this.pagination.currentPage = 0;
    this.setPage(this.pagination.currentPage);
  }

  pagaSize(key: number) {
    this.pagination.pageSize = key;
    this.pagination.currentPage = 0;
    this.setPage(this.pagination.currentPage);
  }

  setPage(currentPage: number) {
    this.pagination.currentPage = currentPage;
    this.getWorks();
  }

  selectProject(key: number) {
    this.pagination.idProject = key;
    this.setPage(0);
  }

  async getEmployee() {
    this.employee = await this.employeeService.getEmployee(this.userName).toPromise();
    this.pagination.idEmployee = this.employee.id;
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe((projects: any) => this.projects = projects.Projects);
  }

  getWorks() {
    this.pagination.idEmployee = this.employee.id;
    this.workService.getWorkForEmployee(this.pagination)
      .subscribe(paginationlist => this.works = paginationlist);
  }

  add(key: Work) {
    let dialogRef = this.dialog.open(AddTimeWorkComponent, {
      height: '400px',
      width: '650px',
      data: key,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        
      }
    });
  }

  constructor(
    private workService: WorkService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private accountService: AccountService,
    private dialog: MatDialog,
  ) { }
  
  async ngOnInitAsync() {
    await this.getEmployee();
    this.getProjects();
    this.setPage(0);
  }
  ngOnInit(): void {
    this.ngOnInitAsync();
  }

}
