import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { timeworkService } from 'src/app/Service/timework.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeWork } from 'src/app/Models/timework';
import { employeeValidator } from 'src/app/shared/Validator/employeeValidator';
import { Work } from 'src/app/Models/work';
import { AccountService } from 'src/app/Service/account.service';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-add-time-work',
  templateUrl: './add-time-work.component.html',
  styleUrls: ['./add-time-work.component.scss']
})
export class AddTimeWorkComponent implements OnInit {

  formCreate: FormGroup;
  username = this.accountService.getJwtUser();
  employee: Employee;
  getEmployee() {
    this.employeeService.getEmployee(this.username)
      .subscribe(employee => this.employee = employee);
  }

  add() {
    const title = this.title.value;
    const description = this.description.value;
    const idWork = this.data.idWork;
    const idEmployee = this.employee.id;
    const hour = this.hour.value;
    const startDate = this.startDate.value;
    const timework: TimeWork = { title, description, idWork, idEmployee, hour, startDate } as TimeWork;
    this.timeworkService.add(timework)
      .subscribe(data => 
        this.dialogRef.close(data)
      )
  }
  constructor(
    private timeworkService: timeworkService,
    @Inject(MAT_DIALOG_DATA) public data: Work,
    private dialogRef: MatDialogRef<AddTimeWorkComponent>,
    private accountService: AccountService,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.getEmployee();
    this.formCreate = new FormGroup({
      hour: new FormControl(null, Validators.required),
      startDate: new FormControl(null, [Validators.required, employeeValidator.checkBirthday]),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })
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
