import { Component, OnInit } from '@angular/core';

import { Work } from './../../Models/work';
import { Pagination } from 'src/app/Models/pagination';
import { MatDialog } from '@angular/material/dialog';
import { DeleteworkComponent } from './deletework/deletework.component';
import { AddworkComponent } from './addwork/addwork.component';
import { paginationList } from 'src/app/Models/paginationList';
import { WorkService } from 'src/app/Service/work.service';
import { UpdateworkComponent } from './updatework/updatework.component';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  works: paginationList<Work>;
  keySearch: string;
  pagination: Pagination = { searchValue: '', currentPage: 1, pageSize :10, sort: 'ASC', sortKey: 'summary' } as Pagination;
  wordColumns: string[] = ['id', 'summary', 'nameProject', 'description', 'status', 'edit', 'delete'];

  searchWork() {
    this.pagination.searchValue = this.keySearch;
    this.pagination.currentPage = 0;
    this.setPage(this.pagination.currentPage);
  }

  sortWork(key: string) {
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

  getWorks() {
    this.workService.getPageWorks(this.pagination)
      .subscribe(paginationlist => this.works = paginationlist);
  }

  dialogAddWork() {
    let dialogRef = this.dialog.open(AddworkComponent, {
      height: '380px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.setPage(0);
      }
    });
  }

  dialogUpdateWork(work: Work) {
    let dialogRef = this.dialog.open(UpdateworkComponent, {
      height: '380px',
      width: '600px',
      data: work,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.works.pageOfItems.push(result);
    });
  }

  dialogDeleteWork(work: Work) {
    let dialogRef = this.dialog.open(DeleteworkComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.works.pageOfItems = this.works.pageOfItems.filter(h => h !== work);
        this.workService.deleteWork(work.idWork).subscribe();
      }
    })
  }

  constructor(
    private dialog: MatDialog,
    private workService: WorkService,
  ) { }

  ngOnInit(): void {
    this.setPage(0);
  }

}
