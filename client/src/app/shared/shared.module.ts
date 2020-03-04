import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { HeaderComponent } from './header/header.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [HeaderComponent, CreateComponent],
  imports: [CoreModule],
  exports: [HeaderComponent, CreateComponent]
})
export class SharedModule {}
