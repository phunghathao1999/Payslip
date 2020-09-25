import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/Models/pagination';
import { Project } from './../../Models/project';

import { ProjectService } from './../../Service/project.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteprojectComponent } from './deleteproject/deleteproject.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { UpdateprojectComponent } from './updateproject/updateproject.component';
import { paginationList } from 'src/app/Models/paginationList';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [ProjectService]
})
export class ProjectComponent implements OnInit {

  projects: paginationList<Project>;
  keySearch = '';
  pagination: Pagination = { searchValue: '', currentPage: 0, pageSize :10, sort: 'ASC', sortKey: 'nameProject' } as Pagination;
  projectColumns: string[] = ['id', 'nameProject', 'startDate', 'endDate', 'description', 'typeProject', 'status', 'edit', 'delete'];

  dialogAddProject() {
    let dialogRef = this.dialog.open(AddprojectComponent, {
      height: '500px',
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.setPage(0);
      }
    });
  }

  dialogUpdatePro(project: Project) {
    let dialogRef = this.dialog.open(UpdateprojectComponent, {
      height: '500px',
      width: '700px',
      data: project,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.projects.pageOfItems.push(result);
    });
  }

  dialogDeletePro(project: Project) {
    let dialogRef = this.dialog.open(DeleteprojectComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.projects.pageOfItems = this.projects.pageOfItems.filter(h => h !== project);
        this.projectService.deleteEmployee(project.idProject).subscribe();
      }
    })
  }

  searchProject() {
    this.pagination.searchValue = this.keySearch;
    this.pagination.currentPage = 0;
    this.setPage(this.pagination.currentPage);
  }

  sort(key: string){
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
    this.getProjects();
  }

  getProjects() {
    this.projectService.getPageProject(this.pagination)
      .subscribe(paginationlist => this.projects = paginationlist);
  }

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setPage(0);
  }

}