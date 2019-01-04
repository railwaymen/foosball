
import { Dictionary } from 'underscore';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { TournamentsProvider } from '../../providers/tournaments/tournaments';
import { ITournamentFields } from 'pages/tournaments/tournaments.interface';
import { GroupsPage } from '../groups/groups';
import { UsersProvider } from '../../providers/users/users';
import _ from 'lodash';
import { UserModel } from '../../models/user-model';
import { ITournamentFormState } from './tournament-form-state.interface';
import DefendersState from './defenders-state';
@Component({
  selector: 'page-tornament-form',
  templateUrl: 'tournament-form.html',
  providers: [TournamentsProvider]
})
export class TournamentFormPage {
  private static readonly blankTournament: ITournamentFields  = { name: '' };
  public tournament: ITournamentFields;
  public users: Array<UserModel>;
  public defenders: Array<UserModel>;
  public attackers: Array<UserModel>;
  private state: ITournamentFormState;

  public constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private readonly alertCtrl: AlertController, public tournamentsProvider: TournamentsProvider, public usersProvider: UsersProvider) {
    this.clearTournament();
    this.users = [];
    this.defenders = [];
    this.attackers = [];
    this.state = new DefendersState();
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
  }

  public presentAlert() : void {
    this.alertCtrl.create({
      title: 'Oops',
      subTitle: 'Something went wrong',
      buttons: ['Ok']
    }).present();
  }

  public saveTournament() : void {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.tournamentsProvider.save(this.tournament, this.defenders, this.attackers)
    .then(tournament => {
      loading.dismiss();
      this.clearTournament();
      this.navCtrl.push(GroupsPage, { tournament });
    }).catch(error => {
      this.presentAlert();
      loading.dismiss();
    });
  }

  private clearTournament() : void {
    this.tournament = Object.assign({}, TournamentFormPage.blankTournament);
  }

  public onUserTap(user: UserModel) : void {
    this.state.onUserTap(this, user);
  }

  public isDefender(user : UserModel) : boolean {
    return this.defenders.indexOf(user) !== -1;
  }

  public isAttacker(user : UserModel) : boolean {
    return this.attackers.indexOf(user) !== -1;
  }

  public filteredUsers() : Array<UserModel> {
    return this.users.filter(this.shouldShowUser.bind(this));
  }

  public message() : String {
    return this.state.message();
  }

  public shouldShowUser(user : UserModel) : boolean {
    return this.state.shouldShowUser(this, user);
  }

  public shouldShowBack() : boolean {
    return this.state.shouldShowBack();
  }

  public unSubmit() : void {
    this.state = this.state.unSubmit();
  }

  public submitText() : string {
    return this.state.submitText();
  }

  public showSubmit() : boolean {
    return this.state.showSubmit(this);
  }

  public submit() : void {
    this.state = this.state.submit();
  }

  public shouldShowSave() : boolean {
    return this.state.shouldShowSave();
  }

  public async fetchUsers(): Promise<void> {
    return this.loadUsers().then(usersData => {
      this.users = (usersData as Array<UserModel>) || [];
    });
  }

  public async loadUsers(): Promise<{}> {
    return this.usersProvider.load()
    .then(data => {
      return data;
    });
  }
}