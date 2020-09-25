import { Routes } from '@angular/router';

import { EmployeeComponent } from './employee/employee.component';
import { ProjectComponent } from './project/project.component';
import { TimeworkComponent } from './timework/timework.component';
import { WorkComponent } from './work/work.component';

import { AuthGuard } from '../auth/auth.guard';
import { PayslipComponent } from './payslip/payslip.component';

export const AdminRoutes: Routes = [
   
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
        { path: 'timework', component: TimeworkComponent },
        { path: 'employee', component: EmployeeComponent },
        { path: 'project', component: ProjectComponent },
        { path: 'work', component: WorkComponent },
        { path: "payslip", component: PayslipComponent },
        { path: '', redirectTo:'timework', pathMatch:'full'},
    ]
  }

]

