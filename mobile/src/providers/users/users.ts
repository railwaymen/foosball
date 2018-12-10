import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import {UserModel} from '../../models/user-model';
import { ENV } from '@app/env';
import { TokenProvider } from '../token/token';

@Injectable()
export class UsersProvider {

  private data: Array<UserModel> = [];
  private readonly endpoint: string;

  public constructor(public http: Http, public tokenProvider: TokenProvider) {
    this.endpoint = `${ENV.API_URL}/players.json`;
  }

  public async load(): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.endpoint}`, this.tokenProvider.requestOptions())
        .map(res => res.json())
        .subscribe(data => {
          this.data = [];
          for (const row of data) {
            this.data.push(
              new UserModel(row.id, row.first_name, row.last_name, row.elo_rating, row.elo_rating_defender, row.elo_rating_attacker)
            );
          }
          resolve(this.data);
        }, err => reject(err));
    });
  }

}
