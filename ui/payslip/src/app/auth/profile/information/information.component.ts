import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Service/employee.service';
import { DatePipe } from '@angular/common';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { employeeValidator } from 'src/app/shared/Validator/employeeValidator';
import { Employee } from 'src/app/Models/employee';
import { AccountService } from 'src/app/Service/account.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogsuccessComponent } from '../dialogsuccess/dialogsuccess.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  formUpEmployee: FormGroup;
  submittedUpdate = true;
  employee: Employee;
  userName = this.accountService.getJwtUser();

  updateEmployee() {
    const id = this.employee.id;
    const fullName = this.fullName.value.trim();
    const telephone = this.telephone.value.trim();
    const email = this.email.value.trim();
    const birthday = this.birthday.value;
    const day = new Date();
    const joinDay = this.datePipe.transform(day, 'yyyy-MM-dd')
    const newEmployee: Employee = { id, fullName, telephone, email, birthday, joinDay } as Employee;
    this.employeeService
      .updateEmployee(newEmployee)
      .subscribe(employee => {
        if(employee) {
          const dialogRef = this.dialog.open(DialogsuccessComponent);
          dialogRef.afterClosed().subscribe(result => {
            this.router.navigated = false;
            this.router.navigate([this.router.url]);
          });
        }
      });
  }

  getEmployee() {
    this.employeeService.getEmployee(this.userName)
      .subscribe(employee => this.employee = employee);
  }

  constructor(
    private employeeService: EmployeeService,
    private accountService: AccountService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getEmployee();
    this.formUpEmployee =  new FormGroup({
      fullName: new FormControl(null, [Validators.required, employeeValidator.checkFullName, Validators.minLength(5)]),
      telephone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
      email: new FormControl({value: null, disabled: true}, [Validators.required, Validators.email]),
      birthday: new FormControl(null, [Validators.required, employeeValidator.checkBirthday])
    });
  }

  get fullName() {
    return this.formUpEmployee.get('fullName');
  }
  get telephone() {
    return this.formUpEmployee.get('telephone');
  }
  get email() {
    return this.formUpEmployee.get('email');
  }
  get birthday() {
    return this.formUpEmployee.get('birthday');
  }

}
