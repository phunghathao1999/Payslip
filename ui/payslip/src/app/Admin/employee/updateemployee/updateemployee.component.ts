import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EmployeeService } from 'src/app/Service/employee.service';
import { Employee } from 'src/app/Models/employee';
import { employeeValidator } from './../../../shared/Validator/employeeValidator';

@Component({
  selector: 'app-updateemployee',
  templateUrl: './updateemployee.component.html',
  styleUrls: ['./updateemployee.component.scss']
})
export class UpdateemployeeComponent implements OnInit {

  formUpEmployee: FormGroup;
  submittedUpdate = true;

  updateEmployee() {
    
      const id = this.data.id;
      const fullName = this.fullName.value.trim();
      const telephone = this.telephone.value.trim();
      const email = this.email.value.trim();
      const birthday = this.birthday.value;
      const day = new Date();
      const joinDay = this.datePipe.transform(day, 'yyyy-MM-dd');
      const status = this.status.value;
      const newEmployee: Employee = { id, fullName, telephone, email, birthday, joinDay, status } as Employee;
      this.employeeService
        .updateEmployee(newEmployee)
        .subscribe(employee => {
          if(employee) {
            this.dialogRef.close(employee);
          }
        });
  }
  constructor(
    private employeeService: EmployeeService,
    private datePipe: DatePipe,
    private formBilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private dialogRef:MatDialogRef<UpdateemployeeComponent>
  ) { }

  ngOnInit(): void {

    this.formUpEmployee =  this.formBilder.group({
      fullName: [this.data.fullName,[Validators.required, employeeValidator.checkFullName, Validators.minLength(5)]],
      telephone: [this.data.telephone,[Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      email: [ {value: this.data.email, disabled: true}, [Validators.required, Validators.email]],
      birthday: [this.data.birthday, [Validators.required, employeeValidator.checkBirthday]],
      status: [this.data.status, Validators.required]
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
  get status() {
    return this.formUpEmployee.get('status');
  }

}
