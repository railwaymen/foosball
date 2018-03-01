import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddUserPage } from '../add-user/add-user';
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
      {id: 3, name: 'User 3'}
    ];
    this.players = [];

  }

  addUser(){
    let addModal = this.modalCtrl.create(AddUserPage);

    addModal.onDidDismiss((user) => {
      if(user){
        this.saveUser(user);
      }
    });

    addModal.present();
  }

   saveUser(user){
    this.users.push(user);
    this.dataService.save(this.users);
  }

  addPlayer(user){
    if(this.isPlayer(user)){
      this.removePlayer(user)
    }else{
      this.players.push(user);
    }
  }

  removePlayer(user){
    _.remove(this.players, function(player) {
      return player.id === user.id;
    });
  }

  playerSize(){
    return _.size(this.players);
  }

  isPlayer(user){
    return !_.isEmpty(_.find(this.players, function(player){ return player.id === user.id; }));
  }

  // viewUser(user){
  //   this.navCtrl.push(UserDetailPage, {
  //       user: user
  //     });
  // }

}
