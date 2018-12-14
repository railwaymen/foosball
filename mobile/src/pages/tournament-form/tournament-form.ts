import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Refresher } from 'ionic-angular';
import { TournamentsProvider } from '../../providers/tournaments/tournaments';
import { ITournament } from 'pages/tournaments/tournaments.interface';
import { GroupsPage } from '../groups/groups';
@Component({
  selector: 'page-tornament-form',
  templateUrl: 'tournament-form.html',
  providers: [TournamentsProvider]
})
export class TournamentFormPage {
  public tournament: ITournament = { name: '', id: 0 };
  public constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private readonly alertCtrl: AlertController, public tournamentsProvider: TournamentsProvider) {
  }

  public presentAlert() {
    this.alertCtrl.create({
      title: 'Oops',
      subTitle: 'Something went wrong',
      buttons: ['Ok']
    }).present();
  }

  public saveTournament() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.tournamentsProvider.save(this.tournament)
    .then(tournament => {
      loading.dismiss();
      this.navCtrl.push(GroupsPage, { tournament });
    }).catch(error => {
      this.presentAlert();
      loading.dismiss();
    });
  }
}