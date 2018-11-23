import { Dictionary } from 'underscore';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Refresher } from 'ionic-angular';
import { GamePage } from '../game/game';
import { GroupsPage } from '../groups/groups';
import { UsersProvider } from '../../providers/users/users';

import _ from 'lodash';
import { IUserModel } from '../game/game.interfaces';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UsersProvider]
})
export class HomePage {

  public users: Dictionary<Array<IUserModel>>;
  public players: Array<IUserModel> = [];
  public teams: Array<'blue' | 'red'> = [];
  public positions: Array<'defender' | 'attacker'> = [];

  public constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private alertCtrl: AlertController, public usersProvider: UsersProvider) {
    this.players = [];
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.fetchUsers().then(() => {
      loading.dismiss();
    }).catch(error => {
      this.presentAlert();
      loading.dismiss();
    });
    this.teams = ['blue', 'red'];
    this.positions = ['defender', 'attacker'];
  }

  public fetchUsers(): Promise<void> {

    return this.loadUsers().then(usersData => {
      this.users = usersData;
    });
  }

  public doRefresh(refresher: Refresher): void {
    this.fetchUsers().then(() => {
      refresher.complete();
    }).catch(error => {
      refresher.complete();
      this.presentAlert();
    });
  }

  public presentAlert(): void {
    const alert = this.alertCtrl.create({
      title: 'Oops',
      subTitle: 'Something went wrong',
      buttons: ['Ok']
    });
    alert.present();
  }

  public loadUsers(): Promise<{}> {

    return this.usersProvider.load()
    .then(data => {
      return data;
    });
  }

  public play(): void {
    this.navCtrl.push(GamePage, { players: this.players });
  }

  public showGroups(): void {
    this.navCtrl.push(GroupsPage, { players: this.players });
  }

  public isTeamCompleted(): boolean {
    return _.size(this.players) >= 4;
  }

  public addPlayer(user: IUserModel): void {
    if (this.isPlayer(user)){
      this.removePlayer(user);
    } else if (!this.isTeamCompleted()){
      const player = _.clone(user);
      player.team = this.currentTeam();
      player.position = this.currentPositionFor(player.team);
      this.players.push(player);
    }
  }

  public currentTeam(): 'blue' | 'red' {
    if (_.size(_.filter(this.players, { 'team': _.first(this.teams) })) > 1){

      return _.last(this.teams);
    } else {

      return _.first(this.teams);
    }
  }

  public currentPositionFor(team: 'blue' | 'red'): 'defender' | 'attacker' {
    if (_.size(_.filter(this.players, { team: team, 'position': _.first(this.positions) })) > 0){

      return _.last(this.positions);
    } else {

      return _.first(this.positions);
    }
  }

  public playerInfo(user: IUserModel): string {
    const player = this.findPlayer(user);
    if (player)

      return `${player.position}`;
  }

  public removePlayer(user: IUserModel): void {
    _.remove(this.players, function(player: IUserModel): boolean {

      return player.id === user.id;
    });
  }

  public playerSize(): number {

    return _.size(this.players);
  }

  public findPlayer(user: IUserModel): IUserModel {

    return _.find(this.players, function(player: IUserModel): boolean { return player.id === user.id; });
  }

  public isPlayer(user: IUserModel): boolean {
    return !_.isEmpty(this.findPlayer(user));
  }

  public isDefender(user: IUserModel): boolean {
    const player = this.findPlayer(user);

    return player && player.position === 'defender';
  }

  public isAttacker(user: IUserModel): boolean {
    const player = this.findPlayer(user);

    return player && player.position === 'attacker';
  }

  public resetTeams(): void {
    this.players = [];
  }
}
