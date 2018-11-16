import { IGroup, IGroupTeam } from './groups.interfaces';
import { IUser } from './../game/game.interfaces';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
import { UserModel } from '../../models/user-model';
import { GamePage } from '../game/game';

import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {

  public groups: Array<IGroup> = [];
  public selectedTeams: Array<IGroupTeam> = [];
  public selectedGroupId: number;
  public players: Array<IUser>;

  public constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public viewCtrl: ViewController, public navParams: NavParams, public groupsProvider: GroupsProvider) {
  }

  public ionViewWillEnter(): void {
    this.players = [];
    this.groupsProvider.load();
  }

  public addTeam(team: IGroupTeam, group: IGroup): void {
    if (this.isTeamSelected(team)) {
      this.removeTeam(team);
    } else if (group.id !== this.selectedGroupId) {
      this.selectedGroupId = group.id;
      this.selectedTeams = [team];
    } else if (this.isCompleted()) {
      return;
    } else {
      this.selectedGroupId = group.id;
      this.selectedTeams.push(team);
    }
  }

  public isTeamSelected(team: IGroupTeam): boolean {
    return !!_.find(this.selectedTeams, function(t: IGroupTeam): boolean { return t.id === team.id; });
  }

  public isCompleted(): boolean {
    return this.selectedTeams.length === 2;
  }

  public removeTeam(team: IGroupTeam): void {
    _.remove(this.selectedTeams, function(t: IGroupTeam): boolean { return t.id === team.id; });
  }

  public play(): void {
    const randomColors = _.shuffle(['red', 'blue']);
    _.each(this.selectedTeams, (team, i) => {
      this.prepareTeamPlayers(team, randomColors[i]);
    });
    this.navCtrl.push(GamePage, { players: this.players, groupId: this.selectedGroupId });
  }

  public prepareTeamPlayers(team: IGroupTeam, color: string): void {
    const attacker: IUser = new UserModel(team.attacker_id, team.attacker_first_name, team.attacker_last_name);
    attacker['team'] = color;
    attacker['position'] = 'attacker';
    this.players.push(attacker);
    const defender = new UserModel(team.defender_id, team.defender_first_name, team.defender_last_name);
    defender['team'] = color;
    defender['position'] = 'defender';
    this.players.push(defender);
  }

  public resetTeams(): void {
    this.selectedTeams = [];
  }
}
