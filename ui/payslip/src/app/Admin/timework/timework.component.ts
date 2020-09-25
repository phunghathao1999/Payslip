import { Component, OnInit } from '@angular/core';
import { timeworkService } from 'src/app/Service/timework.service';
import { paginationList } from 'src/app/Models/paginationList';
import { TimeWork } from 'src/app/Models/timework';
import { Pagination } from 'src/app/Models/pagination';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from './delete/delete.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-timework',
  templateUrl: './timework.component.html',
  styleUrls: ['./timework.component.scss']
})
export class TimeworkComponent implements OnInit {
  keySearch = '';
  timework: paginationList<TimeWork>;
  timeworkColumns: string[] = [ 'title', 'description', 'idWork', 'fullName', 'hour', 'startDate', 'edit', 'delete'];
  pagination: Pagination = { searchValue: '', currentPage: 0, pageSize :10, sort: 'ASC', sortKey: 'title' } as Pagination;
  
  getTimeWork() {
    this.timeworkService.getPageTimeWork(this.pagination)
      .subscribe(timework => this.timework = timework);
  }

  sort(key: string) {

    this.pagination.sortKey = key;
    this.pagination.sort == 'ASC' ? this.pagination.sort = 'DESC' : this.pagination.sort = 'ASC';
    this.pagination.currentPage = 0;
    this.setPage(this.pagination.currentPage);
  }

  setPage(key: number) {
    this.pagination.currentPage = key;
    this.getTimeWork();
  }

  search() {
    this.pagination.searchValue = this.keySearch;
    this.pagination.currentPage = 0;
    this.setPage(this.pagination.currentPage);
  }

  pagaSize(key: number) {
    this.pagination.pageSize = key;
    this.pagination.currentPage = 0;
    this.setPage(this.pagination.currentPage);
  }

  dialogAdd() {
    let dialogRef = this.dialog.open(CreateComponent, {
      height: '440px',
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.setPage(0);
      }
    });
  }

  dialogUpdate(timework: TimeWork) {
    let dialogRef = this.dialog.open(UpdateComponent, {
      height: '440px',
      width: '700px',
      data: timework,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.timework.pageOfItems.push(result);
    });
  }

  dialogDelete(timework: TimeWork) {
    let dialogRef = this.dialog.open(DeleteComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.timework.pageOfItems = this.timework.pageOfItems.filter(h => h !== timework);
        this.timeworkService.delete(timework.idWork).subscribe();
      }
    })
  }

  constructor(
    private timeworkService: timeworkService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getTimeWork();
  }

}
