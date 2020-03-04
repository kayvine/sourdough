import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/route-guards/auth.guard';

import { MailingComponent } from './mailing.component';
import { MailingListComponent } from './mailing-list/mailing-list.component';
import { CreateComponent } from '../shared/create/create.component';

const itemRoutes: Routes = [
  {
    path: 'mailing',
    component: MailingComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MailingListComponent },
      { path: 'create', component: CreateComponent, outlet: 'popup' }
    ]
  }
];

@NgModule({
  declarations: [MailingComponent, MailingListComponent],
  imports: [CoreModule, SharedModule, RouterModule.forChild(itemRoutes)]
})
export class MailingModule {}
