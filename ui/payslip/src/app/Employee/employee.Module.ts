import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule  } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialLibraryModule } from '../shared/material/material-library.module';
import { EmployeeService } from '../Service/employee.service';
import { AccountService } from '../Service/account.service';
import { ProjectService } from '../Service/project.service';
import { TypeprojectService } from '../Service/typeproject.service';
import { WorkService } from '../Service/work.service';
import { timeworkService } from '../Service/timework.service';
import { adminRoutes } from './employee-routing.module';
import { ListWorkComponent } from './list-work/list-work.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';

@NgModule({
    declarations: [
        ListWorkComponent,
        TimeSheetComponent,
    ],
    imports: [
        RouterModule.forChild(adminRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialLibraryModule,
        BrowserModule,
    ],
    exports: [
        ListWorkComponent,
        TimeSheetComponent,
    ],
    providers: [
        EmployeeService,
        AccountService,
        ProjectService,
        TypeprojectService,
        WorkService,
        timeworkService,
    ]
})
export class EmployeeModule {}