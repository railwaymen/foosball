import { Component } from '@angular/core';
import { ModalController, NavController, LoadingController, AlertController } from 'ionic-angular';
import { GamePage } from '../game/game';
import { UsersProvider } from '../../providers/users/users';
import { DataProvider } from '../../providers/data/data';

import _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UsersProvider]
})
export class HomePage {

  public users: any;
  public players: Array<any>=[];
  public teams: Array<any>=[];
  public positions: Array<any>=[];

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private alertCtrl: AlertController, public dataService: DataProvider, public usersProvider: UsersProvider) {
    this.players = [];
    this.users = [];
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.fetchUsers().then(() => {
      loading.dismiss();
    }).catch(error => {
      this.presentAlert();
      loading.dismiss();
    });
    this.teams = ['blue', 'red']
    this.positions = ['defender', 'attacker']
  }

  fetchUsers() {
    return this.loadUsers().then(usersData => {
      this.users = usersData;
    });
  }

  doRefresh(refresher) {
    this.fetchUsers().then(() => {
      refresher.complete();
    }).catch(error => {
      refresher.complete();
      this.presentAlert();
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Oops',
      subTitle: 'Something went wrong',
      buttons: ['Ok']
    });
    alert.present();
  }

  ionViewDidLoad(){

  }

  loadUsers(){
    return this.usersProvider.load()
    .then(data => {
      return data;
    });
  }

  play(){
    this.navCtrl.push(GamePage, { players: this.players })
  }

  isTeamCompleted(){
    return _.size(this.players) >= 4;
  }

  addPlayer(user){
    if(this.isPlayer(user)){
      this.removePlayer(user)
    }else if(!this.isTeamCompleted()){
      var player = _.clone(user);
      player.team = this.currentTeam();
      player.position = this.currentPositionFor(player.team);
      this.players.push(player);
    }
  }

  currentTeam(){
    if(_.size(_.filter(this.players, { 'team': _.first(this.teams) })) > 1){
      return _.last(this.teams)
    } else {
      return _.first(this.teams)
    }
  }

  currentPositionFor(team){
    if(_.size(_.filter(this.players, { team: team, 'position': _.first(this.positions) })) > 0){
      return _.last(this.positions)
    } else {
      return _.first(this.positions)
    }
  }

  playerInfo(user){
    var player = this.findPlayer(user)
    if(player)
      return `${player.position}`
  }

  removePlayer(user){
    _.remove(this.players, function(player) {
      return player.id === user.id;
    });
  }

  playerSize(){
    return _.size(this.players);
  }

  findPlayer(user){
    return _.find(this.players, function(player){ return player.id === user.id; });
  }

  isPlayer(user){
    return !_.isEmpty(this.findPlayer(user));
  }

  isDefender(user){
    var player = this.findPlayer(user);
    return player && player.position == 'defender'
  }

  isAttacker(user){
    var player = this.findPlayer(user);
    return player && player.position == 'attacker'
  }

  resetTeams(){
    this.players = [];
  }
}
