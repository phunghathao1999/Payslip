import { Routes } from '@angular/router';
import { ListWorkComponent } from './list-work/list-work.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { AuthGuard } from '../auth/auth.guard';


export const adminRoutes: Routes = [

  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
        { path: 'listwork', component: ListWorkComponent },
        { path: 'timesheet', component: TimeSheetComponent },
        { path: '', redirectTo:'listwork', pathMatch:'full'},
    ]
  }
]