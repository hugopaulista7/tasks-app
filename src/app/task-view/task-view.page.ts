import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { TaskInterface } from '../services/utils/task.interface';
import { MessageService } from '../services/utils/message.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.page.html',
  styleUrls: ['./task-view.page.scss'],
})
export class TaskViewPage implements OnInit {
  id;
  task: TaskInterface = {
    name: '',
    description: '',
    status: {
      name: ''
    }
  };
  checked = false;
  editing: any = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private message: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // tslint:disable-next-line: triple-equals
    this.editing = this.activatedRoute.snapshot.paramMap.get('edit') == 'false' ? false : true;
    this.getTask();
  }

  getTask() {
    this.api.get('tasks/' + this.id).subscribe((res: TaskInterface) => {
      this.task = res;
    });
  }

  public check() {
    this.task.status.name = this.task.status.name === 'Concluído' ? 'Ativo' : 'Concluído';

    this.api.post('tasks/change-status', {
      status_name: this.task.status.name,
      id: this.task.id
    }).subscribe(res => {
      if (res) {
        this.task = res;
      }
    });
  }

  public toggleEdit() {
    this.editing = !this.editing;
  }

  public goBack() {
    this.router.navigate(['tasks']);
  }


  public save() {
    if (this.task.name.length <= 0) {
      this.message.presentToast('O nome da tarefa deve ser preenchido.', 'danger');
      return ;
    }
    this.api.post('tasks/edit', this.task).subscribe(res => {
      if (res.success) {
        this.task = res.task;
      }
      this.toggleEdit();
    });
  }
}
