import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArrayName, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Service/employee.service';
import { AccountService } from 'src/app/Service/account.service';
import { employeeValidator } from './../../../shared/Validator/employeeValidator';
import { Account } from './../../../Models/account';
import { MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { passwordValidator } from 'src/app/shared/Validator/passwordValidator';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss'],
})
export class AddemployeeComponent implements OnInit {

  formEmployee: FormGroup;
  formCheckMail: FormGroup;
  formCrPassword: FormGroup;
  isOptional = false;
  hide = true;
  hide1 = true;
  Token: false;
  token: string;
  employee: Employee;

  createInformation(stepper: MatStepper) {
    const fullName = this.fullName.value.trim();
    const telephone = this.telephone.value;
    const email = this.email.value.trim();
    const birthday = this.birthday.value;
    const day = new Date();
    const joinDay = this.datePipe.transform(day, 'yyyy-MM-dd')
    const newEmployee: Employee = { fullName, telephone, email, birthday, joinDay } as Employee;
    this.employeeService.addEmployee(newEmployee)
      .subscribe(employee => {
        this.employee = employee,
        stepper.next()
      })
  }

  checkEmail(stepper: MatStepper) {
    this.token = this.ckeckMail.value;
    this.accountService.verifyToken(this.token)
      .subscribe(success => {
        if(success) {
          stepper.next()
        }
      })
  }

  createPassword() {
    const token = this.token;
    const password = this.configpassword.value;
    const account: Account = { token, password } as Account;
    this.accountService.createPasswork(account).subscribe(success => {
      if(success) {
        this.dialogRef.close(this.employee);
      }
    })
  }

  constructor(
    private datePipe: DatePipe,
    private employeeService: EmployeeService,
    private accountService: AccountService,
    private dialogRef:MatDialogRef<AddemployeeComponent>
  ) { }

  ngOnInit(): void {
    this.formEmployee = new FormGroup({
      fullName: new FormControl(null, [Validators.required, employeeValidator.checkFullName, Validators.minLength(5)]),
      telephone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      birthday: new FormControl(null, [Validators.required, employeeValidator.checkBirthday])
    });
    this.formCheckMail = new FormGroup({
      ckeckMail: new FormControl(null, Validators.required)
    });
    this.formCrPassword = new FormGroup({
      password: new FormControl(null, Validators.required),
      configpassword: new FormControl(null, Validators.required)
    }, { validators: passwordValidator });

  }

  get fullName() {
    return this.formEmployee.get('fullName');
  }
  get telephone() {
    return this.formEmployee.get('telephone');
  }
  get email() {
    return this.formEmployee.get('email');
  }
  get birthday() {
    return this.formEmployee.get('birthday');
  }
  get ckeckMail() {
    return this.formCheckMail.get('ckeckMail');
  }
  get password() {
    return this.formCrPassword.get('password');
  }
  get configpassword() {
    return this.formCrPassword.get('configpassword');
  }
}
