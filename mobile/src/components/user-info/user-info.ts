import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { IUser } from 'pages/game/game.interfaces';

@Component({
  selector: 'user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoComponent {

  private readonly user: IUser;

  public constructor(public viewCtrl: ViewController, params: NavParams) {
    this.user = params.get('user');
  }
  private closeModal(): void {
    this.viewCtrl.dismiss();
  }
}
