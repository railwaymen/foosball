import { Component, Input, Output, EventEmitter } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'side-menu',
  templateUrl: 'side-menu.html',
})
export class SideMenu {
  @Input() selected: string;
  @Output() handleMenuChange = new EventEmitter<string>();
  @Input() content: any;
  @Input() entries: any;
  constructor(public navCtrl: NavController, public menuController: MenuController, public app: App) {
    this.menuController.enable(true)
    this.onMenuChange = this.onMenuChange.bind(this)
  }

  onMenuChange(entry : string) : void {
    if (entry === this.selected) {
      return;
    }
    this.handleMenuChange.emit(entry);
  }

}