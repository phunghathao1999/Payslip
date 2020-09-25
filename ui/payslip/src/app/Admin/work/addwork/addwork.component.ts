import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Work } from 'src/app/Models/work';
import { Project } from 'src/app/Models/project';
import { ProjectService } from 'src/app/Service/project.service';
import { WorkService } from 'src/app/Service/work.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addwork',
  templateUrl: './addwork.component.html',
  styleUrls: ['./addwork.component.scss']
})
export class AddworkComponent implements OnInit {

  formCreateWork: FormGroup;
  submittedCreate = true;
  work: Work;
  projects: Project[];

  AddWork() {
    const summary = this.summary.value;
    const idProject = this.idProject.value;
    const status = this.status.value;
    const description = this.description.value;
    const work: Work = { summary, idProject, description, status } as Work;
    this.workService.addWork(work)
      .subscribe(data => 
        this.dialogRef.close(data)
      )
  }

  getProject() {
    this.projectService.getProjects()
      .subscribe((projects: any) => this.projects = projects.Projects);
  }

  constructor(
    private projectService: ProjectService,
    private workService: WorkService,
    private dialogRef: MatDialogRef<AddworkComponent>,
  ) { }

  ngOnInit(): void {
    this.getProject();
    this.formCreateWork = new FormGroup({
      summary: new FormControl(null,[Validators.required, Validators.minLength(5)]),
      idProject: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
  }

  get summary() { 
    return this.formCreateWork.get('summary');
  }
  get idProject() {
    return this.formCreateWork.get('idProject');
  }
  get description() {
    return this.formCreateWork.get('description');
  }
  get status() {
    return this.formCreateWork.get('status');
  }
}
