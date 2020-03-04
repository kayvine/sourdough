import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ItemsModule } from './items/items.module';
import { MailingModule } from './mailing/mailing.module';
import { SharedModule } from './shared/shared.module';
import { TypesModule } from './types/types.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
    data: { title: '' }
    // },
    // {
    //   path: '**',
    //   redirectTo: '/dashboard',
    //   pathMatch: 'full'
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    SharedModule,
    // ROUTER
    RouterModule.forRoot(routes),
    // FEATURE MODULES
    AuthModule,
    DashboardModule,
    TypesModule,
    ItemsModule,
    MailingModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {}
