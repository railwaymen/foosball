import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  public score: any;
  public players: Array<any>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.score = {
      'blue': 0,
      'red': 0
    }
    this.players = navParams.get('players');
  }

  ionViewDidLoad() {
    console.log(this.score);
  }

  isFinish(){
    return this.score.blue > 9 || this.score.red > 9
  }

  goal(team){
    if(!this.isFinish())
      this.score[team] = this.score[team] + 1;
  }

  groupedPlayers(){
    return _.groupBy(this.players, 'team');
  }

}
