import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { ListComponent } from './pages/list/list.component';
import { NewItemComponent } from './pages/new-item/new-item.component';
import { UpdateItemComponent } from './pages/update-item/update-item.component';
import { ViewItemComponent } from './pages/view-item/view-item.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'newItem',
        component: NewItemComponent,
      },
      {
        path: 'newItem/:id',
        component: NewItemComponent,
      },
      {
        path: 'updateItem/:id',
        component: UpdateItemComponent,
      },
      {
        path: 'viewItem/:id',
        component: ViewItemComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
