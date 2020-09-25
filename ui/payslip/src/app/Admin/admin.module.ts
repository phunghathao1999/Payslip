import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule  } from '@angular/platform-browser';

import { AddemployeeComponent } from './employee/addemployee/addemployee.component';
import { DeleteemployeeComponent } from './employee/deleteemployee/deleteemployee.component';
import { UpdateemployeeComponent } from './employee/updateemployee/updateemployee.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialLibraryModule } from '../shared/material/material-library.module';
import { EmployeeService } from '../Service/employee.service';
import { AccountService } from '../Service/account.service';
import { ProjectComponent } from './project/project.component';
import { TimeworkComponent } from './timework/timework.component';
import { WorkComponent } from './work/work.component';
import { AddworkComponent } from './work/addwork/addwork.component';
import { UpdateworkComponent } from './work/updatework/updatework.component';
import { DeleteprojectComponent } from './project/deleteproject/deleteproject.component';
import { UpdateprojectComponent } from './project/updateproject/updateproject.component';
import { AddprojectComponent } from './project/addproject/addproject.component';
import { DeleteworkComponent } from './work/deletework/deletework.component';
import { ProjectService } from '../Service/project.service';
import { TypeprojectService } from '../Service/typeproject.service';
import { AdminRoutes } from './admin-routing.module';
import { WorkService } from '../Service/work.service';
import { endDateValidatorDirective } from '../shared/Validator/endDateValidator';
import { passwordValidatorDirective } from '../shared/Validator/passwordValidator';
import { timeworkService } from '../Service/timework.service';
import { CreateComponent } from './timework/create/create.component';
import { UpdateComponent } from './timework/update/update.component';
import { DeleteComponent } from './timework/delete/delete.component';
import { PayslipComponent } from './payslip/payslip.component';
import { PayslipService } from './../Service/payslip.service';
import { FileService } from './../Service/file.service';

@NgModule({
    declarations: [
        AddemployeeComponent,
        DeleteemployeeComponent,
        UpdateemployeeComponent,
        EmployeeComponent,
        ProjectComponent,
        TimeworkComponent,
        WorkComponent,
        AddworkComponent,
        UpdateworkComponent,
        DeleteworkComponent,
        AddprojectComponent,
        UpdateprojectComponent,
        DeleteprojectComponent,
        endDateValidatorDirective,
        passwordValidatorDirective,
        CreateComponent,
        UpdateComponent,
        DeleteComponent,
        PayslipComponent,
    ],
    imports: [
        RouterModule.forChild(AdminRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialLibraryModule,
        BrowserModule,
    ],
    exports: [
        AddemployeeComponent,
        DeleteemployeeComponent,
        UpdateemployeeComponent,
        EmployeeComponent,
        ProjectComponent,
        TimeworkComponent,
        WorkComponent,
        AddworkComponent,
        UpdateworkComponent,
        DeleteworkComponent,
        AddprojectComponent,
        UpdateprojectComponent,
        DeleteprojectComponent,
        endDateValidatorDirective,
        passwordValidatorDirective,
        CreateComponent,
        UpdateComponent,
        DeleteComponent,
        PayslipComponent,
    ],
    providers: [
        EmployeeService,
        AccountService,
        ProjectService,
        TypeprojectService,
        WorkService,
        timeworkService,
        PayslipService,
        FileService,
    ]
})
export class AdminModule {}