import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchivedTasksPageRoutingModule } from './archived-tasks-routing.module';

import { ArchivedTasksPage } from './archived-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchivedTasksPageRoutingModule
  ],
  declarations: [ArchivedTasksPage]
})
export class ArchivedTasksPageModule {}
