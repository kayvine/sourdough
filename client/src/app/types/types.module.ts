import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from '../core/route-guards/auth.guard';
import { TypesComponent } from './types.component';

const routes: Routes = [
  { path: 'types', component: TypesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [TypesComponent],
  imports: [CoreModule, SharedModule, RouterModule.forChild(routes)]
})
export class TypesModule {}
