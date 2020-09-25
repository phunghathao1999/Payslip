import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { timeworkService } from './../../../Service/timework.service';
import { WorkService } from 'src/app/Service/work.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { TimeWork } from 'src/app/Models/timework';
import { Employee } from 'src/app/Models/employee';
import { Work } from 'src/app/Models/work';
import { EmployeeService } from 'src/app/Service/employee.service';
import { employeeValidator } from 'src/app/shared/Validator/employeeValidator';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  formCreate: FormGroup;
  employees: Employee[];
  works: Work[];

  add() {
    const title = this.title.value;
    const description = this.description.value;
    const idWork = this.idWork.value;
    const idEmployee = this.idEmployee.value;
    const hour = this.hour.value;
    const startDate = this.startDate.value;
    const timework: TimeWork = { title, description, idWork, idEmployee, hour, startDate } as TimeWork;
    this.timeworkService.add(timework)
      .subscribe(data => 
        this.dialogRef.close(data)
      )
  }

  getWork() {
    this.workService.getWorks()
      .subscribe((work: any) => this.works = work.Works);
  }

  getEmpoyee() {
    this.employeeService.getEmployees()
      .subscribe(employee => this.employees = employee);
  }

  constructor(
    private timeworkService: timeworkService,
    private workService: WorkService,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<CreateComponent>,
  ) { }

  ngOnInit(): void {
    this.getEmpoyee();
    this.getWork();
    this.formCreate = new FormGroup({
      idWork: new FormControl(null, Validators.required),
      idEmployee: new FormControl(null, Validators.required),
      hour: new FormControl(null, Validators.required),
      startDate: new FormControl(null, [Validators.required, employeeValidator.checkBirthday]),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })
  }

  get idWork() {
    return this.formCreate.get('idWork');
  }
  get idEmployee() {
    return this.formCreate.get('idEmployee');
  }
  get hour() {
    return this.formCreate.get('hour');
  }
  get startDate() {
    return this.formCreate.get('startDate');
  }
  get title() {
    return this.formCreate.get('title');
  }
  get description() {
    return this.formCreate.get('description');
  }

}
