import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Refresher, ModalController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { UserModel } from '../../models/user-model';
import _ from 'lodash';
import { UserInfoComponent } from '../../components/user-info/user-info';
import { IUser } from '../game/game.interfaces';

@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
  providers: [UsersProvider]
})
export class RankingPage {

  private readonly userNameInput: string;
  private search: boolean;
  private users: Array<UserModel>;
  private filteredUsers: Array<UserModel>;

  public constructor(public navCtrl: NavController, public navParams: NavParams, private readonly alertCtrl: AlertController, public loadingCtrl: LoadingController, public usersProvider: UsersProvider, public modalCtrl: ModalController) {
    this.fetchUsers();
  }
  public fetchUsers(): void {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.usersProvider.load().then((data) => {
      this.users = this.filteredUsers = _.orderBy(data, 'elo_rating', 'desc');
      loading.dismiss();
    }).catch(error => {
      this.presentAlert();
      loading.dismiss();
    });
  }
  public doRefresh(refresher: Refresher): void {
    this.usersProvider.load().then((users) => {
      refresher.complete();
    }).catch(error => {
      refresher.complete();
      this.presentAlert();
    });
  }
  public presentUserInfoModal(userId: number): void {
    const targetUser: IUser = _.find(this.users, { id: userId });
    const modal = this.modalCtrl.create(UserInfoComponent, {'user': targetUser });
    modal.present();
  }

  private filterUsers(): void {
    this.filteredUsers = this.users;
    if (this.userNameInput && this.userNameInput.trim() !== '') {
      this.search = true;
      this.filteredUsers = this.filteredUsers.filter((user) => {
        const isPlayerOnList = user.name().toLowerCase().includes(this.userNameInput.toLowerCase());
        if (isPlayerOnList) return user;
      });
    } else {
      this.search = false;
    }
  }

  private hasHigherElo(user: IUser): boolean {

    return this.hasDefenderHigherElo(user) || this.hasAttackerHigherElo(user);
  }

  private hasDefenderHigherElo(user: IUser): boolean {

    return user.elo_rating_defender > user.elo_rating_attacker;
  }

  private hasAttackerHigherElo(user: IUser): boolean {

    return user.elo_rating_attacker > user.elo_rating_defender;
  }

  public presentAlert(): void {
    const alert = this.alertCtrl.create({
      title: 'Oops',
      subTitle: 'Something went wrong',
      buttons: ['Ok']
    });
    alert.present();
  }
}
