import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    loadChildren: './tasks/tasks.module#TasksPageModule'
  },
  {
    path: 'task-view',
    loadChildren: './task-view/task-view.module#TaskViewPageModule'
  },
  {
    path: 'archived-tasks',
    loadChildren: './archived-tasks/archived-tasks.module#ArchivedTasksPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
