import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/Service/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkService } from 'src/app/Service/work.service';
import { Employee } from 'src/app/Models/employee';
import { Work } from 'src/app/Models/work';
import { TimeWork } from 'src/app/Models/timework';
import { employeeValidator } from 'src/app/shared/Validator/employeeValidator';
import { timeworkService } from './../../../Service/timework.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  formUpdate: FormGroup;
  employees: Employee[];
  works: Work[];

  update() {
    const idWorktime = this.data.idWorktime;
    const title = this.title.value;
    const description = this.description.value;
    const idWork = this.idWork.value;
    const idEmployee = this.idEmployee.value;
    const hour = this.hour.value;
    const startDate = this.startDate.value;
    const timework: TimeWork = { idWorktime, title, description, idWork, idEmployee, hour, startDate } as TimeWork;
    this.timeworkService.update(timework)
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
    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeWork,
  ) { }

  ngOnInit(): void {
    this.getEmpoyee();
    this.getWork();
    this.formUpdate = new FormGroup({
      idWork: new FormControl(this.data.idWork, Validators.required),
      idEmployee: new FormControl(this.data.idEmployee, Validators.required),
      hour: new FormControl(this.data.hour, Validators.required),
      startDate: new FormControl(this.data.startDate, [Validators.required, employeeValidator.checkBirthday]),
      title: new FormControl(this.data.title, Validators.required),
      description: new FormControl(this.data.description, Validators.required),
    })
  }

  get idWork() {
    return this.formUpdate.get('idWork');
  }
  get idEmployee() {
    return this.formUpdate.get('idEmployee');
  }
  get hour() {
    return this.formUpdate.get('hour');
  }
  get startDate() {
    return this.formUpdate.get('startDate');
  }
  get title() {
    return this.formUpdate.get('title');
  }
  get description() {
    return this.formUpdate.get('description');
  }

}
