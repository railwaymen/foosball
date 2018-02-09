import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddUserPage } from '../add-user/add-user';
import { UserDetailPage } from '../user-detail/user-detail';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public users;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: DataProvider) {
    this.dataService.getData().then((users) => {
      if(users){
        this.users = users;
      }
    })
  }

  ionViewDidLoad(){

    this.users = [
      {name: 'User 1'},
      {name: 'User 2'},
      {name: 'User 3'}
    ];

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

  viewUser(user){
    this.navCtrl.push(UserDetailPage, {
        user: user
      });
  }

}
