import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public gamesProvider: GamesProvider) {
    this.score = {
      'blue': 0,
      'red': 0
    }
    this.players = navParams.get('players');
    this.groupedPlayers = _.groupBy(this.players, 'team');
  }

  isFinish(){
    return this.score.blue > 9 || this.score.red > 9
  }

  goal(team){
    if(!this.isFinish())
      this.score[team] = this.score[team] + 1;
  }

  save(){
    this.gamesProvider.save({ "games": {
      team_blue: [
        { user_id: this.groupedPlayers.blue[0].id, position: this.groupedPlayers.blue[0].position },
        { user_id: this.groupedPlayers.blue[1].id, position: this.groupedPlayers.blue[1].position }
      ],
      team_red: [
        { user_id: this.groupedPlayers.red[0].id, position: this.groupedPlayers.red[0].position },
        { user_id: this.groupedPlayers.red[1].id, position: this.groupedPlayers.red[1].position }
      ],
      score_blue: this.score.blue,
      score_red: this.score.red
    } })
    .then(data => {
      this.navCtrl.getPrevious().instance.resetTeams();
      this.viewCtrl.dismiss();
    });
  }

}
