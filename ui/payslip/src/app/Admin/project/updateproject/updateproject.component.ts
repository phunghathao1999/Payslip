import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/Models/project';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TypeProject } from 'src/app/Models/typeProject';
import { TypeprojectService } from 'src/app/Service/typeproject.service';
import { ProjectService } from 'src/app/Service/project.service';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-updateproject',
  templateUrl: './updateproject.component.html',
  styleUrls: ['./updateproject.component.scss']
})
export class UpdateprojectComponent implements OnInit {
  formUpdateProject: FormGroup;
  typeProjects: TypeProject[];
  employees: Employee[];
  project: Project;

  UpdateProject() {
    const idProject = this.data.idProject;
    const nameProject = this.nameProject.value;
    const startDate = this.startDate.value;
    const endDate = this.endDate.value;
    const idTypeProject = this.typeProject.value;
    const description = this.description.value;
    const status = this.status.value;
    const idEmployee = this.employee.value;
    const project: Project = { idProject, nameProject, startDate, endDate, idTypeProject, description, status, idEmployee} as Project;
    this.projectService.updateProject(project)
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
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private dialogRef:MatDialogRef<UpdateprojectComponent>
  ) { }

  ngOnInit(): void {
    this.getTypeProjects();
    this.getEmployee();
    this.formUpdateProject = new FormGroup({
      nameProject: new FormControl(this.data.nameProject, [Validators.required, Validators.minLength(5)]),
      startDate: new FormControl(this.data.startDate, Validators.required),
      endDate: new FormControl(this.data.endDate, Validators.required),
      typeProject: new FormControl(this.data.idTypeProject, Validators.required),
      status: new FormControl(this.data.status, Validators.required),
      employee: new FormControl(this.data.idEmployee, Validators.required),
      description: new FormControl(this.data.description, Validators.required),
    });
  }

  get nameProject() {
    return this.formUpdateProject.get('nameProject');
  }
  get startDate() {
    return this.formUpdateProject.get('startDate');
  }
  get endDate() {
    return this.formUpdateProject.get('endDate');
  }
  get typeProject() {
    return this.formUpdateProject.get('typeProject');
  }
  get status() {
    return this.formUpdateProject.get('status');
  }
  get employee() {
    return this.formUpdateProject.get('employee');
  }
  get description() {
    return this.formUpdateProject.get('description');
  }

}
