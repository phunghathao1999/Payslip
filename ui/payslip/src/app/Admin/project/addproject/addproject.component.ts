import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Project } from 'src/app/Models/project';

import { TypeProject } from './../../../Models/typeProject';
import { TypeprojectService } from 'src/app/Service/typeproject.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/Service/project.service';
import { validatorEndDate } from './../../../shared/Validator/endDateValidator';
import { EmployeeService } from 'src/app/Service/employee.service';
import { Employee } from 'src/app/Models/employee';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.scss']
})
export class AddprojectComponent implements OnInit {

  formCreateProject: FormGroup;
  typeProjects: TypeProject[];
  employees: Employee[];
  project: Project;

  AddProject() {
    const nameProject = this.nameProject.value;
    const startDate = this.startDate.value;
    const endDate = this.endDate.value;
    const idTypeProject = this.typeProject.value;
    const description = this.description.value;
    const status = this.status.value;
    const idEmployee = this.employee.value;
    const project: Project = { nameProject, startDate, endDate, idTypeProject, description, status, idEmployee } as Project;
    this.projectService.addProject(project)
      .subscribe( data => 
        this.dialogRef.close(data)
      )
  }

  getTypeProjects() {
    this.typePService.getTypeProjects()
      .subscribe((data: any) => this.typeProjects = data.typeProjects );
  }

  getEmployee() {
    this.employeeService.getEmployees()
      .subscribe((data: any) => this.employees = data);
  }

  constructor(
    private typePService: TypeprojectService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<AddprojectComponent>
  ) { }

  ngOnInit(): void {
    this.getTypeProjects();
    this.getEmployee();
    this.formCreateProject = new FormGroup({
      nameProject: new FormControl(null,[Validators.required, Validators.minLength(5)]),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      typeProject: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      employee: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    }, { validators: validatorEndDate });
    
  }

  get nameProject() {
    return this.formCreateProject.get('nameProject');
  }
  get startDate() {
    return this.formCreateProject.get('startDate');
  }
  get endDate() {
    return this.formCreateProject.get('endDate');
  }
  get typeProject() {
    return this.formCreateProject.get('typeProject');
  }
  get status() {
    return this.formCreateProject.get('status');
  }
  get employee() {
    return this.formCreateProject.get('employee');
  }
  get description() {
    return this.formCreateProject.get('description');
  }
}