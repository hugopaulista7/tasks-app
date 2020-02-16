import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastTasksPageRoutingModule } from './past-tasks-routing.module';

import { PastTasksPage } from './past-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PastTasksPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PastTasksPage]
})
export class PastTasksPageModule {}
