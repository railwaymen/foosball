import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { GamesProvider } from '../../providers/games/games';

import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  public score: any;
  public players: Array<any>=[];
  public groupedPlayers: any;
  public startedAt: Date;
  public finishedAt: Date;
  public goals: Object;
  public goalsHistory: Object;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public viewCtrl: ViewController, private alertCtrl: AlertController, public navParams: NavParams, public gamesProvider: GamesProvider) {
    this.score = {
      'blue': 0,
      'red': 0
    }
    this.players = navParams.get('players');
    this.groupedPlayers = _.groupBy(this.players, 'team');
    this.startedAt = new Date();
    this.goals = {};
    _.each(this.players, player =>
      this.goals[player.id] = 0
     );
    this.goalsHistory = {blue: [], red: []};
  }

  isFinish(){
    return this.score.blue > 9 || this.score.red > 9
  }

  goalsFor(player){
    return this.goals[player.id];
  }


  playerGoal(playerId, own:boolean = false){
    if (this.isFinish()) return;

    const player = _.find(this.players, {id: playerId});
    this.goals[player.id] = own ? --this.goals[player.id] : ++this.goals[player.id];
    this.setGoalsOnTeam(player, own);
  }

  setGoalsOnTeam(player, own:boolean = false){
    if (!own) {
      this.goalsHistory[player.team].push(player.id);
    } else {
      this.goalsHistory[player.team].pop();
    }
    this.score[player.team] = own ? --this.score[player.team] : ++this.score[player.team]
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Oops',
      subTitle: 'Something went wrong',
      buttons: ['Ok']
    });
    alert.present();
  }

  save(){
    this.finishedAt = new Date();
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.gamesProvider.save({ "games": {
      red_attacker_id: this.groupedPlayers.red[0].id,
      red_defender_id: this.groupedPlayers.red[1].id,
      blue_attacker_id: this.groupedPlayers.blue[0].id,
      blue_defender_id: this.groupedPlayers.blue[1].id,
      blue_score: this.score.blue,
      red_score: this.score.red,
      started_at: this.startedAt,
      finished_at: this.finishedAt
    } })
    .then(data => {
      loading.dismiss();
      this.navCtrl.getPrevious().instance.resetTeams();
      this.viewCtrl.dismiss();
    }).catch(error => {
      loading.dismiss();
      this.presentAlert();
    });
  }

}
