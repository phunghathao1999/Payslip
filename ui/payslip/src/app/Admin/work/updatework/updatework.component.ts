import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ProjectService } from 'src/app/Service/project.service';
import { WorkService } from 'src/app/Service/work.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Work } from 'src/app/Models/work';
import { Project } from 'src/app/Models/project';

@Component({
  selector: 'app-updatework',
  templateUrl: './updatework.component.html',
  styleUrls: ['./updatework.component.scss']
})
export class UpdateworkComponent implements OnInit {

  formUpdateWork: FormGroup;
  submittedCreate = true;
  work: Work;
  projects: Project[];

  updateWork() {
    const idWork = this.data.idWork;
    const summary = this.summary.value;
    const idProject = this.idProject.value;
    const description = this.description.value;
    const status = this.status.value;
    const work: Work = { idWork, summary, idProject, description, status } as Work;
    this.workService.updateWork(work)
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
    @Inject(MAT_DIALOG_DATA) public data: Work,
    private dialogRef: MatDialogRef<UpdateworkComponent>,
  ) { }

  ngOnInit(): void {
    this.getProject();
    this.formUpdateWork = new FormGroup({
      summary: new FormControl(this.data.summary,[Validators.required, Validators.minLength(5)]),
      idProject: new FormControl(this.data.idProject,Validators.required),
      status: new FormControl(this.data.status, Validators.required),
      description: new FormControl(this.data.description,Validators.required),
    });
  }

  get summary() { 
    return this.formUpdateWork.get('summary');
  }
  get idProject() {
    return this.formUpdateWork.get('idProject');
  }
  get description() {
    return this.formUpdateWork.get('description');
  }
  get status() {
    return this.formUpdateWork.get('status');
  }
}
