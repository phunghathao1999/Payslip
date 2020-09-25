import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Service/account.service';
import { EmployeeService } from 'src/app/Service/employee.service';
import { Employee } from 'src/app/Models/employee';
import { FileService } from 'src/app/Service/file.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogavatarComponent } from './dialogavatar/dialogavatar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  employee: Employee;
  userName = this.accountService.getJwtUser();
  img = 'http://localhost:8080/api/employees/avatar/phunghathao1999@gmail.com';
  constructor(
    private accountService: AccountService,
    private employeService: EmployeeService,
    private fileService: FileService,
    private dialog: MatDialog,
  ) { }

  getavatar() {
    this.employeService.getAvatar(this.userName)
      .subscribe((img:any) => {
        console.log(img);
      });
  }

  setavatar(file: File) {
    this.fileService.saveavatar(this.employee.id, file)
      .subscribe();
  }

  openAvatar() {
    let dialogRef = this.dialog.open(DialogavatarComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      }
    });
  }

  ngOnInit(): void {
    this.getavatar();
    this.employeService.getEmployee(this.userName)
      .subscribe(employee => this.employee = employee)
  }

}
