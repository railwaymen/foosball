import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { Dictionary } from 'underscore';
import { Component, QueryList, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { GamesProvider } from '../../providers/games/games';
import { ISwipeEvent, IAlertMessage, IScore, IUserModel, IUserResult, IUser, IPlayerData, IGameHistory, IOnGoalInfo } from './game.interfaces';
import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})

export class GamePage {
  private readonly gameUpTo: number = 10;

  public score: IScore;
  public players: Array<IUserModel> = [];
  public groupedPlayers: Dictionary<Array<IUserModel>>;
  public startedAt: Date;
  public finishedAt: Date;
  public goals: Object;
  public goalsHistory: IGameHistory;
  public scoreFreezed: boolean = false;
  public groupId: number;
  public leaderId: number;
  public leaderGoalsCount: number;

  public constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public viewCtrl: ViewController, private alertCtrl: AlertController, public navParams: NavParams, public gamesProvider: GamesProvider) {
    this.score = {
      blue: 0,
      red: 0
    };

    this.leaderGoalsCount = 0;
    this.players = navParams.get('players');
    this.groupId = navParams.get('groupId');
    this.gameUpTo = this.groupId == null ? 10 : 7;
    this.groupedPlayers = _.groupBy(this.players, 'team');
    this.startedAt = new Date();
    this.goals = {};
    _.each(this.players, player =>
      this.goals[player.id] = 0
     );
    this.goalsHistory = {
      blue: [],
      red: [],
      own: {
        blue: [],
        red: []
      }
    };
  }

  public onGoal(info: IOnGoalInfo): void {
    if (this.isFinish()) return;

    this.addGoal(info.player, info.own);
    this.setCurrentLeader();

    if (this.score.red === this.gameUpTo || this.score.blue === this.gameUpTo) {
      const winningTeam: string = this.score.red > this.score.blue ? 'red' : 'blue';
      this.presentAlert('endGameInfo', winningTeam);
    }
  }

  public isFinish(): boolean {
    return this.score.blue >= this.gameUpTo || this.score.red >= this.gameUpTo;
  }

  public getAllPlayerGoalsCount(player: IUserModel): number {

    return this.goals[player.id];
  }

  public getPositivePlayerGoals(player: IUserModel): number {
    return this.goals[player.id] - this.getSpecificPlayerGoalsCount(player, true);
  }

  public getSpecificPlayerGoalsCount(player: { id: number, team: 'blue' | 'red' }, own: boolean = false): number {
    let result = 0;
    const ownGoalsStorage = own ? this.goalsHistory.own[player.team] : this.goalsHistory[player.team];
    ownGoalsStorage.forEach(element => {
      if (Number(element) === player.id) result++;
    });

    return result;
  }

  public setCurrentLeader(): void {
    const maxVal = _.max(_.values(this.goals));
    this.leaderId = parseInt(_.keys(this.goals).find(key => this.goals[key] === maxVal));
  }

  private addGoal(player: IUserModel, own: boolean = false): void {
    const teamToAddPoint: string = own ? this.getOpponentTeamName(player.team) : player.team;
    this.score[teamToAddPoint]++;
    this.goalsHistory[teamToAddPoint].push(player.id);
    this.goals[player.id]++;
  }

  private getOpponentTeamName(team: string): string {
    return team === 'blue' ? 'red' : 'blue';
  }

  private reduceGoal(team: string): void {
    const playerId = this.goalsHistory[team].pop();
    this.goals[playerId] -= 1;
    if (this.score[team] < 1) return;
    this.score[team] -= 1;
  }

  public swipeBlue(event: ISwipeEvent): void {
    if (event.direction !== 2) return;
    this.reduceGoal('blue');
  }
  public swipeRed(event: ISwipeEvent): void {
    if (Number(event.direction) !== 4) return;
    this.reduceGoal('red');
  }

  public presentAlert(type: string = 'error', winingTeam: string = ''): void {
    const messages: IAlertMessage = {
      error: this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Something went wrong',
        buttons: ['Ok']
      }),
      endGameInfo: this.alertCtrl.create({
        title: 'Game Over',
        subTitle: `Team ${winingTeam} wins!`,
        buttons: ['Ok']
      }),
    };
    messages[type].present();
  }

  public playersResult(): Array<IUserResult>{
    const results = [];
    _.each(this.players, player => {
      const oppositeTeam = this.getOpponentTeamName(player.team);
      results.push({
        player_id: player.id,
        team: player.team,
        position: player.position,
        gols: _.countBy(this.goalsHistory[player.team])[player.id] || 0,
        own_gols: _.countBy(this.goalsHistory[oppositeTeam])[player.id] || 0
      });
    });

    return results;
  }

  public save(): void {
    this.finishedAt = new Date();
    const loading = this.loadingCtrl.create({
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
