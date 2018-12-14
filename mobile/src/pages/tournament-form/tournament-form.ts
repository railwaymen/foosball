import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { TournamentsProvider } from '../../providers/tournaments/tournaments';
import { ITournamentFields } from 'pages/tournaments/tournaments.interface';
import { GroupsPage } from '../groups/groups';
@Component({
  selector: 'page-tornament-form',
  templateUrl: 'tournament-form.html',
  providers: [TournamentsProvider]
})
export class TournamentFormPage {
  private static readonly blankTournament: ITournamentFields  = { name: '' };
  public tournament: ITournamentFields;
  public constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private readonly alertCtrl: AlertController, public tournamentsProvider: TournamentsProvider) {
    this.clearTournament();
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
    this.tournamentsProvider.save(this.tournament)
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
}