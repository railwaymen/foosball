import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GamesProvider } from '../../providers/games/games';

@IonicPage()
@Component({
  selector: 'page-game-list',
  templateUrl: 'game-list.html',
})

export class GameListPage {
  public games: Array<any>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public gamesProvider: GamesProvider) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.gamesProvider.resetList()
    this.gamesProvider.loadList();
    this.games = [];
  }

  doInfinite(infiniteScroll) {
    this.gamesProvider.loadMore(infiniteScroll);
  }
}
