import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { TasksPage } from '../tasks/tasks.page';
import { MessageService } from '../services/utils/message.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PopoverService } from '../services/utils/popover.service';

@Component({
  selector: 'app-past-tasks',
  templateUrl: './past-tasks.page.html',
  styleUrls: ['./past-tasks.page.scss'],
})
export class PastTasksPage extends TasksPage implements OnInit {

  public tasks: [] = [];
  constructor(
    protected api: ApiService,
    protected message: MessageService,
    protected formBuilder: FormBuilder,
    protected popover: PopoverService,
    protected router: Router
  ) {
    super(api, message, formBuilder, popover, router);
    this.tasks = [];
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.api.get('tasks/get/past').subscribe(res => {
      if (res.success) {
        this.tasks = res.tasks;
      }
    });
  }

}
