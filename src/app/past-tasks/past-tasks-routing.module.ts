import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastTasksPage } from './past-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: PastTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastTasksPageRoutingModule {}
