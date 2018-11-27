import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ENV } from '@app/env';
import { TokenProvider } from '../token/token';
import { IGame } from '../../pages/game/game.interfaces';

@Injectable()
export class GamesProvider {

  private readonly endpoint: string;

  public constructor(public http: Http, public tokenProvider: TokenProvider) {
    this.endpoint = `${ENV.API_URL}/games.json`;
  }

  public async save(params: IGame): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.endpoint}`, { 'games' : params }, this.tokenProvider.requestOptions())
        .subscribe(data => {
          resolve(data);
        }, err => reject(err));
    });
  }

}
