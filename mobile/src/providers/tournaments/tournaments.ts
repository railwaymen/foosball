import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TournamentModel } from '../../models/tournament-model';
import { ENV } from '@app/env';

@Injectable()
export class TournamentsProvider {

  private _data: Array<TournamentModel> = [];
  private readonly endpoint: string;

  public constructor(public http: HttpClient) {
    this.endpoint = `${ENV.API_URL}/tournaments.json`;
  }
  public async load(): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.endpoint}`)
        .subscribe((data) => {
          this._data = [];
          for (const row of data as Array<TournamentModel>) {
            this._data.push(
              new TournamentModel(row.id, row.name)
            );
          }
          resolve(data);
        }, err => reject(err));
    });
  }
}
