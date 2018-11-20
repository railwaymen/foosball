import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GroupModel } from '../../models/group-model';
import { ENV } from '@app/env';

@Injectable()
export class GroupsProvider {

  private _data: Array<GroupModel> = [];
  public endpoint: string;

  public constructor(public http: HttpClient) {
    this.endpoint = `${ENV.API_URL}/tournaments/1/groups.json`;
  }

  public async load(tournamentId : number): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.endpoint}`)
        .subscribe((data) => {
          this._data = [];
          for (const row of data as Array<GroupModel>) {
            this._data.push(
              new GroupModel(row.id, row.name, row.teams, row.tournament_id)
            );
          }
          resolve(this._data);

          return this._data;
        }, err => reject(err));
    });
  }
}
