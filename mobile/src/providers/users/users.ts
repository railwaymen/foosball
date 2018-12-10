import { ENV } from '@app/env';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../models/user-model';
import { IUserApi } from 'pages/game/game.interfaces';

@Injectable()
export class UsersProvider {

  private _data: Array<UserModel>;
  public endpoint: string;

  public constructor(public http: HttpClient) {
    this.endpoint = `${ENV.API_URL}/players.json`;
  }

  public async load(): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.endpoint}`)
        .subscribe((data) => {
          this._data = [];
          for (const row of data as Array<IUserApi>) {

            this._data.push(
              new UserModel(row.id, row.first_name, row.last_name)
            );
          }
          resolve(this._data);

          return this._data;
        }, err => reject(err));
    });
  }

}
