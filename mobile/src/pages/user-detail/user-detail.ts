import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {

  public name: string;

  public constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public ionViewDidLoad(): void {
    this.name = this.navParams.get('user').name;
  }
}
