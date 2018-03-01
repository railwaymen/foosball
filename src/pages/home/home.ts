import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { GamePage } from '../game/game';
// import { AddUserPage } from '../add-user/add-user';
// import { UserDetailPage } from '../user-detail/user-detail';
import { DataProvider } from '../../providers/data/data';

import _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public users: Array<any>=[];
  public players: Array<any>=[];
  public teams: Array<any>=[];
  public positions: Array<any>=[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: DataProvider) {
    this.players = [];
    // this.dataService.save([]);
    // this.dataService.getData().then((users) => {
    //   if(users){
    //     this.users = users;
    //   }
    // })
  }

  ionViewDidLoad(){
    this.users = [
      {id: 1, name: 'User 1'},
      {id: 2, name: 'User 2'},
      {id: 3, name: 'User 3'},
      {id: 4, name: 'User 4'},
      {id: 5, name: 'User 5'}
    ];
    this.players = [];
    this.teams = ['blue', 'red']
    this.positions = ['defender', 'attacker']
  }

  // addUser(){
  //   let addModal = this.modalCtrl.create(AddUserPage);

  //   addModal.onDidDismiss((user) => {
  //     if(user){
  //       this.saveUser(user);
  //     }
  //   });

  //   addModal.present();
  // }

  play(){
    this.navCtrl.push(GamePage, { players: this.players });
  }

   saveUser(user){
    this.users.push(user);
    this.dataService.save(this.users);
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

  // viewUser(user){
  //   this.navCtrl.push(UserDetailPage, {
  //       user: user
  //     });
  // }

}
