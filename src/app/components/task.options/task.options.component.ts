import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, AlertController } from '@ionic/angular';
import { TaskOptionsInterface } from 'src/app/services/utils/task.options.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task.options',
  templateUrl: './task.options.component.html',
  styleUrls: ['./task.options.component.scss'],
})
export class TaskOptionsComponent implements OnInit {

  task;

  editTask = (task: any) => {
    this.router.navigate(['task-view', {id: task.id, edit: true}]);
    this.popover.dismiss();
  }

  archiveTask = async (task: any) => {
    const alert = await this.alert.create({
      header: 'Confirmar',
      message: 'Deseja realmente arquivar essa tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Confirmar',
          handler: () => this.confirmArchive(task)
        }
      ]
    });
    alert.present();
  }
  confirmArchive = (task: any) => {
    this.api.get('tasks/delete/' + task.id).subscribe(({success}) => {
      this.popover.dismiss({
        archived: true
      });
    });
  }
  // tslint:disable-next-line: member-ordering
  options: TaskOptionsInterface[] = [
    {
      name: 'Editar',
      icon: 'pencil',
      handler: this.editTask
    },
    {
      name: 'Arquivar',
      icon: 'archive',
      handler: this.archiveTask
    }
  ];

  constructor(
    private navParms: NavParams,
    private popover: PopoverController,
    public api: ApiService,
    public alert: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
    this.task = this.navParms.get('task');
  }
}
