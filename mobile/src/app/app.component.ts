import { Component, Type, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { GroupsPage } from '../pages/groups/groups';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage:Type<HomePage> = HomePage;
  @ViewChild(Nav) private readonly nav: Nav;

  public constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public openGroupsPage(): void {
    this.nav.setRoot(GroupsPage);
    this.menuCtrl.close();
  }

  public openHomePage(): void {
    this.nav.setRoot(HomePage);
    this.menuCtrl.close();
  }
}