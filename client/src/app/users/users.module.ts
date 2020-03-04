import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../core/route-guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users.component';

const itemRoutes: Routes = [
  { path: 'profile', canActivate: [AuthGuard] },
  { path: 'account', canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [ProfileComponent, UsersComponent],
  imports: [CoreModule, SharedModule, RouterModule.forChild(itemRoutes)]
})
export class UsersModule {}
