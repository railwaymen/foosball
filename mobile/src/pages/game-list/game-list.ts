import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { GamesProvider } from '../../providers/games/games';
import { GamePage } from '../game/game';
import { UserModel } from '../../models/user-model';
import { IGame } from './game-list.interfaces';

import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-game-list',
  templateUrl: 'game-list.html',
})

export class GameListPage {
  public games: Array<IGame> = [];

  public constructor(public navCtrl: NavController, public navParams: NavParams, public gamesProvider: GamesProvider) {
  }

  public ionViewWillEnter(): void {
    this.gamesProvider.resetList();
    this.gamesProvider.loadList();
    this.games = [];
  }

  public doInfinite(infiniteScroll: InfiniteScroll): void {
    this.gamesProvider.loadMore(infiniteScroll);
  }

  public playAgain(game: IGame): void {
    const players = _.map(game.players, (p) => {
      const player = new UserModel(p.id, p.first_name, p.last_name);
      player.team = p.team;
      player.position = p.position;

      return player;
    });
    this.navCtrl.push(GamePage, { players: players });
  }
}
