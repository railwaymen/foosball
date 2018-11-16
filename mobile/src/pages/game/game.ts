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
  public scoreFreezed: boolean = false;
  public groupId: number;
  public gameUpTo: number;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public viewCtrl: ViewController, private alertCtrl: AlertController, public navParams: NavParams, public gamesProvider: GamesProvider) {
    this.score = {
      'blue': 0,
      'red': 0
    }
    this.players = navParams.get('players');
    this.groupId = navParams.get('groupId');
    this.gameUpTo = this.groupId == null ? 10 : 7;
    this.groupedPlayers = _.groupBy(this.players, 'team');
    this.startedAt = new Date();
    this.goals = {};
    _.each(this.players, player =>
      this.goals[player.id] = 0
     );
    this.goalsHistory = {blue: [], red: []};
  }

  onGoal(info) {
    if (this.isFinish()) return;
    let player = info.player;
    let team = info.own ? this.getOpponentTeamName(player.team) : player.team;
    this.score[team]++;
    this.goalsHistory[team].push(player.id);
    this.goals[player.id]++;
  }

  isFinish(){
    return this.score.blue >= this.gameUpTo || this.score.red >= this.gameUpTo
  }

  goalsFor(player){
    return this.goals[player.id];
  }

  getOpponentTeamName(team: string): string {
    return team === 'blue' ? 'red' : 'blue';
  }

  reduceGoal(team: string): void {
    const playerId = this.goalsHistory[team].pop();
    this.goals[playerId] -= 1;
    if (this.score[team] < 1) return;
    this.score[team] -= 1;
  }

  swipeBlue(event){
    if (event.direction != 2) return;
    this.reduceGoal('blue');
  }
   swipeRed(event){
    if (event.direction != 4) return;
    this.reduceGoal('red');
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Oops',
      subTitle: 'Something went wrong',
      buttons: ['Ok']
    });
    alert.present();
  }

  playersResult(){
    let results = [];
    _.each(this.players, player => {
      let oppositeTeam = this.getOpponentTeamName(player.team);
      results.push({
        player_id: player.id,
        team: player.team,
        position: player.position,
        gols: _.countBy(this.goalsHistory[player.team])[player.id] || 0,
        own_gols: _.countBy(this.goalsHistory[oppositeTeam])[player.id] || 0
      })
    });
    return results;
  }

  save(){
    this.finishedAt = new Date();
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.gamesProvider.save({ 'games': {
      red_attacker_id: this.groupedPlayers.red[0].id,
      red_defender_id: this.groupedPlayers.red[1].id,
      blue_attacker_id: this.groupedPlayers.blue[0].id,
      blue_defender_id: this.groupedPlayers.blue[1].id,
      blue_score: this.score.blue,
      red_score: this.score.red,
      started_at: this.startedAt,
      finished_at: this.finishedAt,
      group_id: this.groupId,
      games_players_attributes: this.playersResult()
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
