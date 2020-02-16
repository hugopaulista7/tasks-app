import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toast: ToastController
  ) { }

  async presentToast(message, color = 'danger', buttons = []) {
    const toast = await this.toast.create({
      message,
      position: 'middle',
      duration: 3000,
      color,
      animated: true,
      buttons
    });


    toast.present();
  }
}
