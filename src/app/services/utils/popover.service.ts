import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TaskOptionsComponent } from 'src/app/components/task.options/task.options.component';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  constructor(private popover: PopoverController) { }

  async showPopover(task, event) {
    const pop = await this.popover.create({
      component: TaskOptionsComponent,
      backdropDismiss: true,
      showBackdrop: true,
      animated: true,
      componentProps: {task},
      keyboardClose: true,
      event
    });

    pop.present();

    const {data} = await pop.onDidDismiss();

    return data;
  }
}
