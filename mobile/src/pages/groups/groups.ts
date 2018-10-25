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

  public groups: Array<any>=[];
  public selectedTeams: Array<any>=[];
  public selectedGroupId: string='';
  public players: Array<any>;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public viewCtrl: ViewController, public navParams: NavParams, public groupsProvider: GroupsProvider) {
  }

  ionViewWillEnter(){
    this.players = [];
    this.groupsProvider.load();
  }

  addTeam(team, group){
    if (this.isTeamSelected(team)) {
      this.removeTeam(team);
    } else if (group.id != this.selectedGroupId) {
      this.selectedGroupId = group.id;
      this.selectedTeams = [team];
    } else if (this.isCompleted()) {
      return;
    } else {
      this.selectedGroupId = group.id;
      this.selectedTeams.push(team);
    }
  }

  isTeamSelected(team){
    return !!_.find(this.selectedTeams, function(t){ return t.id === team.id; });
  }

  isCompleted(){
    return this.selectedTeams.length == 2
  }

  removeTeam(team){
    _.remove(this.selectedTeams, function(t){ return t.id === team.id; });
  }

  play(){
    let randomColors = _.shuffle(['red', 'blue']);
    _.each(this.selectedTeams, (team, i) => {
      this.prepareTeamPlayers(team, randomColors[i]);
    });
    this.navCtrl.push(GamePage, { players: this.players, groupId: this.selectedGroupId })
  }

  prepareTeamPlayers(team, color){
    let attacker = new UserModel(team.attacker_id, team.attacker_first_name, team.attacker_last_name);
    attacker['team'] = color
    attacker['position'] = 'attacker'
    this.players.push(attacker)
    let defender = new UserModel(team.defender_id, team.defender_first_name, team.defender_last_name);
    defender['team'] = color
    defender['position'] = 'defender'
    this.players.push(defender)
  }
}
