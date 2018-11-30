import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { GamesProvider } from '../../providers/games/games';
import { ISwipeEvent, IAlertMessage, IScore, IGamePlayer, IGameHistory, IOnGoalInfo } from './game.interfaces';
import { UserModel } from '../../models/user-model';
import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})

export class GamePage {
  private readonly gameUpTo: number;

  public score: IScore;
  public players: Array<UserModel> = [];
  public blueDefender: UserModel;
  public blueAttacker: UserModel;
  public redDefender: UserModel;
  public redAttacker: UserModel;
  public startedAt: Date;
  public finishedAt: Date;
  public goalsHistory: IGameHistory;
  public scoreFreezed: boolean = false;
  public groupId: number;
  public leaderId: number;

  public constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public viewCtrl: ViewController, private readonly alertCtrl: AlertController, public navParams: NavParams, public gamesProvider: GamesProvider) {
    this.score = {
      blue: 0,
      red: 0
    };

    this.players = navParams.get('players');
    this.groupId = navParams.get('groupId');
    this.gameUpTo = this.groupId == null ? 10 : 7;

    this.blueDefender = _.find(this.players, {team: 'blue', position: 'defender'});
    this.blueAttacker = _.find(this.players, {team: 'blue', position: 'attacker'});
    this.redDefender = _.find(this.players, {team: 'red', position: 'defender'});
    this.redAttacker = _.find(this.players, {team: 'red', position: 'attacker'});

    this.startedAt = new Date();
    this.goalsHistory = {
      blue: [],
      red: []
    };
  }

  public onGoal(info: IOnGoalInfo): void {
    if (this.isFinish()) return;

    this.addGoal(info.player, info.own);
    this.setCurrentLeader();
  }

  public isFinish(): boolean {
    return this.score.blue >= this.gameUpTo || this.score.red >= this.gameUpTo;
  }

  public setCurrentLeader(): void {
    this.leaderId = _.maxBy(this.playersResult(), 'gols').player_id;
  }

  private addGoal(player: UserModel, own: boolean = false): void {
    const teamToAddPoint: string = own ? this.getOpponentTeamName(player.team) : player.team;
    this.score[teamToAddPoint]++;
    this.goalsHistory[teamToAddPoint].push(player);
  }

  private getOpponentTeamName(team: string): string {
    return team === 'blue' ? 'red' : 'blue';
  }

  private reduceGoal(team: string): void {
    if (this.score[team] < 1) return;
    this.goalsHistory[team].pop();
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
      })
    };
    messages[type].present();
  }

  private goalsFor(player: UserModel): number{
    return _.filter(this.goalsHistory[player.team], { id: player.id }).length;
  }

  private ownGoalsFor(player: UserModel): number{
    const oppositeTeam = this.getOpponentTeamName(player.team);

    return _.filter(this.goalsHistory[oppositeTeam], { id: player.id }).length;
  }

  public playersResult(): Array<IGamePlayer>{
    const results = [];
    _.each(this.players, player => {
      results.push({
        player_id: player.id,
        team: player.team,
        position: player.position,
        gols: this.goalsFor(player),
        own_gols: this.ownGoalsFor(player)
      });
    });

    return results;
  }

  private confirmRematch(): void {
    const alert = this.alertCtrl.create({
      title: 'Rematch',
      message: 'Do you want to play rematch?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => this.closeGame()
        },
        {
          text: 'Yes',
          handler: () => {
            _.each(this.players, player => player.switchTeam());
            const currentIndex = this.navCtrl.getActive().index;
            this.navCtrl.push(GamePage, { players: this.players }).then(() => {
              this.navCtrl.remove(currentIndex);
            });
          }
        }
      ]
    });
    alert.present();
  }

  private afterGameSaved(): void{
    if (!!this.groupId) {
      this.closeGame();
    } else {
      this.confirmRematch();
    }
  }

  private closeGame(): void{
    if (!!this.groupId) {
      this.navCtrl.getPrevious().instance.resetTeams();
      this.viewCtrl.dismiss();
    } else {
      this.navCtrl.popToRoot();
    }
  }

  public save(): void{
    this.finishedAt = new Date();
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.gamesProvider.save({
      red_attacker_id: this.redAttacker.id,
      red_defender_id: this.redDefender.id,
      blue_attacker_id: this.blueAttacker.id,
      blue_defender_id: this.redDefender.id,
      blue_score: this.score.blue,
      red_score: this.score.red,
      started_at: this.startedAt,
      finished_at: this.finishedAt,
      group_id: this.groupId,
      games_players_attributes: this.playersResult()
    })
    .then(data => {
      loading.dismiss();
      this.afterGameSaved();
    }).catch(error => {
      loading.dismiss();
      this.presentAlert();
    });
  }
}
