import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../core/route-guards/auth.guard';

import { ItemsComponent } from './items.component';
import { ItemListComponent } from './item-list/item-list.component';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CreateComponent } from '../shared/create/create.component';

const itemRoutes: Routes = [
  {
    path: 'content',
    component: ItemsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ItemListComponent },
      {
        path: 'create',
        outlet: 'popup',
        children: [
          { path: '', component: CreateComponent },
          { path: ':type', component: NewItemComponent }
        ]
      },
      { path: ':type/new', component: NewItemComponent },
      {
        path: 'edit/:id',
        component: ItemDetailComponent,
        data: { title: 'Items' }
      }
      // {
      //   path: 'edit?id=4564564654546',
      //   component: ItemEditComponent
      // }
    ]
    // },
    // {
    //   path: 'new',
    //   component: NewItemComponent,
    //   outlet: 'popup'
  }
];

@NgModule({
  declarations: [
    ItemsComponent,
    ItemListComponent,
    NewItemComponent,
    ItemDetailComponent
  ],
  imports: [CoreModule, SharedModule, RouterModule.forChild(itemRoutes)]
})
export class ItemsModule {}
