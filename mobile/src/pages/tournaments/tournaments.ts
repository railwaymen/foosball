import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { TournamentsProvider } from '../../providers/tournaments/tournaments';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
  providers: [TournamentsProvider]
})
export class TournamentsPage {

  public tournaments: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private alertCtrl: AlertController, public tournamentsProvider: TournamentsProvider) {
    this.tournaments = [];
    let loading = this.loadingCtrl.create({
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

  fetchTournaments() {
    return this.loadTournaments().then(tournamentsData => {
      this.tournaments = tournamentsData;
    });
  }

  doRefresh(refresher) {
    this.fetchTournaments().then(() => {
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

  loadTournaments(){
    return this.tournamentsProvider.load()
    .then(data => {
      return data;
    });
  }
}