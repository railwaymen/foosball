import { Component } from '@angular/core';
import { Dictionary } from 'underscore';
import { NavController, LoadingController, AlertController, Refresher } from 'ionic-angular';
import { TournamentsProvider } from '../../providers/tournaments/tournaments';
import { ITournament } from './tournaments.interface';
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
  providers: [TournamentsProvider]
})
export class TournamentsPage {
  public tournaments: Dictionary<Array<ITournament>>;
  public constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private readonly alertCtrl: AlertController, public tournamentsProvider: TournamentsProvider) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.fetchTournaments().then(() => {
      loading.dismiss();
    }).catch(error => {
      this.presentAlert();
      loading.dismiss();
    });
  }

  public async fetchTournaments() : Promise<void>{
    return this.loadTournaments().then(tournamentsData => {
      this.tournaments = tournamentsData;
    });
  }

  public doRefresh(refresher: Refresher): void {
    this.fetchTournaments().then(() => {
      refresher.complete();
    }).catch(error => {
      refresher.complete();
      this.presentAlert();
    });
  }
  public presentAlert() : void {
    const alert = this.alertCtrl.create({
      title: 'Oops',
      subTitle: 'Something went wrong',
      buttons: ['Ok']
    });
    alert.present();
  }
  public async loadTournaments() : Promise<{}>{
    return this.tournamentsProvider.load()
    .then(data => {
      return data;
    });
  }
}