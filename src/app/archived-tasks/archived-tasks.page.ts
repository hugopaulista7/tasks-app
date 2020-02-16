import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-archived-tasks',
  templateUrl: './archived-tasks.page.html',
  styleUrls: ['./archived-tasks.page.scss'],
})
export class ArchivedTasksPage implements OnInit {

  tasks: [] = [];
  constructor(
    private api: ApiService
  ) {
    this.tasks = [];
  }
  ngOnInit() {
    this.getArchivedTasks();
  }
  public getArchivedTasks() {
    this.api.get('tasks/archived').subscribe(res => {
      this.tasks = res;
    });
  }

}
