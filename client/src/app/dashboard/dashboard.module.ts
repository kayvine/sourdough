import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from '../core/route-guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { title: 'Dashboard' }
  }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CoreModule, SharedModule, RouterModule.forChild(routes)]
})
export class DashboardModule {}
