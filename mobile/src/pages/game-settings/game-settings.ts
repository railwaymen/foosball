import _ from 'lodash';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray } from 'ionic-angular';
import { UserModel } from 'models/user-model';

@IonicPage()
@Component({
  selector: 'page-game-settings',
  templateUrl: 'game-settings.html',
})
export class GameSettingsPage {

  private players: Array<UserModel>;
  public reorderedPlayers: Array<UserModel>;

  public constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.players = this.navParams.get('players');
  }
  public reorderItems(indexes: { from: number, to: number }): void {
    this.players = reorderArray(this.players, indexes);
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].team = i < 2 ? 'blue' : 'red';
      this.players[i].position = i % 2 === 0 ? 'defender' : 'attacker';
    }
    this.reorderedPlayers = this.players;
  }
  public findPlayer(user: UserModel): UserModel {

    return _.find(this.players, function(player: UserModel): boolean { return player.id === user.id; });
  }

  public isPlayer(user: UserModel): boolean {
    return !_.isEmpty(this.findPlayer(user));
  }

  public isDefender(user: UserModel): boolean {
    const player = this.findPlayer(user);

    return player && player.position === 'defender';
  }

  public isAttacker(user: UserModel): boolean {
    const player = this.findPlayer(user);

    return player && player.position === 'attacker';
  }

  public ionViewWillLeave(): void {
    this.navCtrl.getPrevious().data.players = this.players;
  }

}
