import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV } from '@app/env';
import { IGame } from '../../pages/game/game.interfaces';
import { GameModel } from '../../models/game-model';
import { InfiniteScroll } from 'ionic-angular';

@Injectable()
export class GamesProvider {

  private readonly endpoint: string;
  private data: Array<GameModel> = [];
  private page: number = 1;

  public constructor(public http: HttpClient) {
    this.endpoint = `${ENV.API_URL}/games.json`;
  }

   public async save(params: IGame): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.endpoint}`, params)
        .subscribe((data) => {
          resolve(data);
        }, err => reject(err));
    });
  }

  public resetList(): void {
    this.data = [];
    this.page = 1;
  }

  public async loadMore(infiniteScroll?: InfiniteScroll): Promise<{}> {
    this.page += 1;

    return this.loadList(infiniteScroll);
  }

  public async loadList(infiniteScroll?: InfiniteScroll): Promise<{}> {

    return new Promise((resolve, reject) => {
      this.http.get(`${this.endpoint}?page=${this.page}`)
        .subscribe(data => {
          for (const row of data as Array<GameModel>) {
            this.data.push(
              new GameModel(row.id, row.red_score, row.blue_score, row.created_at, row.players)
            );
          }
          if (infiniteScroll) {
            infiniteScroll.complete();
          }
          if (this.data.length === 0) {
            infiniteScroll.enable(false);
          }

          resolve(data);
        }, err => reject(err));
    });
  }
}
