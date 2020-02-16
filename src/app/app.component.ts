import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api/api.service';
import { LoginService } from './services/user/login.service';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      name: 'Tarefas do dia',
      route: '/tasks',
      icon: 'today'
    },
    {
      name: 'Tarefas arquivadas',
      route: '/archived-tasks',
      icon: 'archive'
    },
    {
      name: 'Tarefas passadas',
      route: '/past-tasks',
      icon: 'time'
    }
  ];

  public selectedPath = '';


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private login: LoginService,
    private router: Router
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
