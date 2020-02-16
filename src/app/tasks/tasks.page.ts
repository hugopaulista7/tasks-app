import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { MessageService } from '../services/utils/message.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaskValidator } from './task.validator';
import { PopoverService } from '../services/utils/popover.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks = [];
  newTask: FormGroup;

  constructor(
    private api: ApiService,
    private message: MessageService,
    private formBuilder: FormBuilder,
    private popover: PopoverService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newTask = this.formBuilder.group(TaskValidator.rules());
    this.getTasks();
  }

  public getTasks() {
    this.api.get('tasks').subscribe(res => {
      this.tasks = res;
    });
  }

  public addTask() {
    if (this.newTask.invalid && this.newTask.controls.name.value.length <= 0) {
      this.message.presentToast('O nome da tarefa deve ser preenchido!');
      return;
    }
    const date = new Date();
    const taskObj = {
      name: this.newTask.controls.name.value,
      description: this.newTask.controls.description.value,
      updated_at: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    };

    this.tasks.push(taskObj);

    this.sendTask(taskObj);
  }

  sendTask(taskObj) {
    this.api.post('tasks/create', taskObj).subscribe(({success}) => {
      if (!success) {
        this.message.presentToast('Ocorreu um erro ao criar sua tarefa');
        return ;
      }

      this.message.presentToast('Tarefa criada com sucesso', 'success', ['OK']);
      this.newTask.reset();
    });
  }

  async showTaskOptions(task, ev) {
    const taskAction = await this.popover.showPopover(task, ev);
    if (taskAction.archived) {
      this.archiveTask(task);
    }
  }

  archiveTask(task) {
    const index = this.tasks.find(el => el.id === task.id);
    const archivedTask = this.tasks.splice(index, 1)[0]; // returns an array with just one element

    this.message.presentToast('Tarefa arquivada com sucesso!', 'success', ['OK']);
  }

  viewTask(task) {
    this.router.navigate(['task-view', {id: task.id, edit: false}]);
  }
}
