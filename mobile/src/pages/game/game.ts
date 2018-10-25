import { Component, QueryList, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController, ItemSliding } from 'ionic-angular';
import { GamesProvider } from '../../providers/games/games';
import { IPlayerData, IGameHistory, IPlayer } from './game.interfaces';
import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})

export class GamePage {
  @ViewChildren(ItemSliding) usernameNode: QueryList<ItemSliding>;
  @ViewChild('usersList') UserList : ElementRef;
  readonly gameUpTo: number=10;

  public score: any;
  public players: Array<any>=[];
  public groupedPlayers: any;
  public startedAt: Date;
  public finishedAt: Date;
  public goals: Object;
  public goalsHistory: IGameHistory;
  public scoreFreezed: boolean = false;
  public groupId: number;
  public leaderGoalsCount: number;
  public leader: number;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public viewCtrl: ViewController, private alertCtrl: AlertController, public navParams: NavParams, public gamesProvider: GamesProvider) {
    this.score = {
      'blue': 0,
      'red': 0
    }
    this.leader;
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
  ngAfterViewInit() {
    this.initializeObserver();
  }

  initializeObserver(): void {
    const nodesToObserve: Array<ItemSliding> = this.usernameNode.toArray();
    nodesToObserve.forEach((node) => {
      const targetItem: Node = node.item._elementRef.nativeElement;
      const observer: MutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => this.handleMutation(mutation, targetItem));
      });
      observer.observe(targetItem, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ['style']
      });
    });
  }

  handleMutation(mutation: MutationRecord, element: any): void {
    if (!mutation || !mutation.oldValue) return
    const translate3dFirstVal: RegExpMatchArray = mutation.oldValue.match(/(\(.\d{2,})/g);
    if (!translate3dFirstVal) return;
    const position: number = parseInt(translate3dFirstVal[0].split('(')[1]);
    const maxValue: number = element.offsetWidth;
    const playerProps: IPlayerData = element.dataset;

    if (!element.getAttribute('style').length) {
      this.scoreFreezed = false;
    }
    if ((position === maxValue
      || position === -maxValue)
      && !this.scoreFreezed) {
      if (playerProps.team === 'blue') {
        this.playerGoal(parseInt(playerProps.player), position > 0);
      } else {
        this.playerGoal(parseInt(playerProps.player), position < 0);
      }
      this.scoreFreezed = true;
    }
  }

  setCurrentLeader(): void {
    const nodesToDecorate = this.UserList.nativeElement.getElementsByClassName('item');
    for(const node of nodesToDecorate) {
      const playerProps: IPlayerData = node.dataset;
      const playerGoals: number = this.getSpecificPlayerGoalsCount({ id: parseInt(playerProps.player), team: playerProps.team});
      const playerOwnGoals: number = this.getSpecificPlayerGoalsCount({ id: parseInt(playerProps.player), team: playerProps.team}, true);
      if (playerGoals - playerOwnGoals > this.leaderGoalsCount) {
        this.leaderGoalsCount = playerGoals;
        this.leader = parseInt(playerProps.player);
      }
    }
    this.restyleNodes();
  }
  restyleNodes() {
    const dataNodes = this.UserList.nativeElement.getElementsByClassName('item');
    for(const node of dataNodes) {
      const playerProps: IPlayerData = node.dataset;
      if (parseInt(playerProps.player) === this.leader) {
        node.getElementsByClassName('card')[0].style.borderBottom = '10px solid yellow';
      } else {
        node.getElementsByClassName('card')[0].style.borderBottom = '1px solid rgba(0,0,0,0.2)';
      }
    }
  }
  isFinish(): boolean {
    return this.score.blue >= this.gameUpTo || this.score.red >= this.gameUpTo
  }

  getAllPlayerGoalsCount(player: IPlayer): number {
    return this.goals[player.id];
  }

  getSpecificPlayerGoalsCount(player, own: boolean = false): number {
    let result = 0;
    const ownGoalsStorage: Array<number> = own ? this.goalsHistory.own[player.team] : this.goalsHistory[player.team];
    ownGoalsStorage.forEach(element => {
      if (element === player.id) result++;
    });
    return result;
  }

  getPositivePlayerGoals(player: IPlayer): number {
    return this.goals[player.id] - this.getSpecificPlayerGoalsCount(player, true);
  }

  playerGoal(playerId, own:boolean = false): void {
    if (this.isFinish()) return;

    const player = _.find(this.players, {id: playerId});
    this.addGoal(player, own);
    this.goals[player.id]++;
    this.setCurrentLeader();
  }

  addGoal(player: IPlayer, own: boolean = false): void {
    const teamToAddPoint: string = own ? this.getOpponentTeamName(player.team) : player.team;
    this.score[teamToAddPoint]++;
    if (own) {
      this.goalsHistory.own[player.team].push(player.id);
      return;
    }
    this.goalsHistory[player.team].push(player.id);
  }

  getOpponentTeamName(team: string): string {
    // const teams: string[] = Object.keys(this.score);
    // const result = teams.find((teamName) => {
    //   return teamName !== team;
    // });
    // return result;

    return team === 'blue' ? 'red' : 'blue';
  }

  reduceGoal(team: string): void {
    const playerId = this.goalsHistory[team].pop();
    this.goals[playerId] -= 1;
    if (this.score[team] < 1) return;
    this.score[team] -= 1;
  }

  onDrag(item: ItemSliding): void {
    setTimeout(() => {
      item.close();
      return;
    }, 2000);
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
      let oppositeTeam = (player.team == 'red') ? 'blue' : 'red';
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
    this.gamesProvider.save({ "games": {
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
