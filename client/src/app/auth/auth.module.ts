import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

import { UserGuard } from '../core/route-guards/user.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UserGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [UserGuard] }
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CoreModule, SharedModule, RouterModule.forChild(routes)]
})
export class AuthModule {}
