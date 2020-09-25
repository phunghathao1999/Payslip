import { Component, OnInit } from '@angular/core';
import { timeworkService } from 'src/app/Service/timework.service';
import { TimeWork } from 'src/app/Models/timework';
import { AccountService } from 'src/app/Service/account.service';
import { EmployeeService } from 'src/app/Service/employee.service';
import { Asignment } from './../../Models/asignment';
import { ProjectService } from 'src/app/Service/project.service';
import { Project } from 'src/app/Models/project';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {

  timeworks: TimeWork[];
  projects: Project[];
  asignment: Asignment;
  userName = this.accountService.getJwtUser();
  firstDate: Date;
  lastDate: Date;
  fromDate: Date;
  toDate: Date;
  sunday: TimeWork[];
  monday: TimeWork[];
  tuseday: TimeWork[];
  wednesday: TimeWork[];
  thursday: TimeWork[];
  friday: TimeWork[];
  saturday: TimeWork[];
  
  async getTimeWork() {
    const employee = await this.employeeService.getEmployee(this.userName).toPromise();
    const idEmployee = employee.id;
    this.asignment = { idEmployee } as Asignment;
    this.timeworks = await this.timeworkService.getTimeWorkByEmployee(this.asignment).toPromise();
    
    this.firstDate = new Date(this.timeworks[0].startDate);
    this.lastDate = new Date(this.timeworks[this.timeworks.length - 1].startDate);

    const temp1 =  6 - this.firstDate.getDay();
    this.toDate = new Date(this.firstDate);
    this.toDate = new Date(this.toDate.setDate(this.toDate.getDate() + temp1));

    this.fromDate = new Date(this.toDate);
    this.fromDate = new Date(this.fromDate.setDate(this.fromDate.getDate() - 6));
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe((project: any) => this.projects = project.Projects);
  }

  selectProject(idProject: number) {
    this.asignment = { idProject } as Asignment;
    this.schedule();
  }

  schedule() {
    this.sunday = [];
    this.monday = [];
    this.tuseday = [];
    this.wednesday = [];
    this.thursday = [];
    this.friday = [];
    this.saturday  = [];
    for(let item of this.timeworks) {
      const date = new Date(item.startDate);
      const number = date.getDay();
      if(this.fromDate <= date && date <= this.toDate) {
        if(number == 0) {
          this.sunday.push(item);
        }
        if(number == 1) {
          this.monday.push(item);
        }
        if(number == 2) {
          this.tuseday.push(item);
        }
        if(number == 3) {
          this.wednesday.push(item);
        }
        if(number == 4) {
          this.thursday.push(item);
        }
        if(number == 5) {
          this.friday.push(item);
        }
        if(number == 6) {
          this.saturday.push(item);
        }
      }
    }
  }

  previous() {
    this.toDate = new Date(this.toDate.setDate(this.toDate.getDate() - 7));
    this.fromDate = new Date(this.fromDate.setDate(this.fromDate.getDate() - 7));
    this.schedule();
  }
  next() {
    this.toDate = new Date(this.toDate.setDate(this.toDate.getDate() + 7));
    this.fromDate = new Date(this.fromDate.setDate(this.fromDate.getDate() + 7));
    this.schedule();
  }

  constructor(
    private timeworkService: timeworkService,
    private accountService: AccountService,
    private employeeService: EmployeeService,
    private projectService: ProjectService,
  ) { }

  async oninit() {
    await this.getTimeWork();
    this.schedule();
    this.getProjects();
  }
  ngOnInit(): void {
    this.oninit();
  }

}
