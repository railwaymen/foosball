import { Component, Input, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TournamentsPage } from '../tournaments/tournaments';

@Component({
  selector: 'side-menu',
  templateUrl: 'side-menu.html',
})
export class SideMenu {
  @Input() selected: string;
  @Input() content: any;
  constructor(public navCtrl: NavController, public menuController: MenuController, public app: App) {
    this.menuController.enable(true)
    this.onMenuChange = this.onMenuChange.bind(this)
  }

  get entries() {
    return ['Players', 'Tournaments'];
  }

  onMenuChange(entry) : void {
    if (entry === this.selected) {
      return;
    }
    this.menuController.enable(false)
    if (entry === 'Players') {
      this.menuController.enable(false)
      this.navCtrl.push(HomePage)
    } else {
      this.menuController.enable(false)
      this.navCtrl.push(TournamentsPage)
    }

  }

}