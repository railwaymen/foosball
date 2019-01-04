import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../models/user-model';
import { TournamentModel } from '../../models/tournament-model';
import { ITournamentFields } from '../../pages/tournaments/tournaments.interface';
import { ENV } from '@app/env';

@Injectable()
export class TournamentsProvider {

  private _data: Array<TournamentModel> = [];
  private readonly endpoint: string;

  public constructor(public http: HttpClient) {
    this.endpoint = `${ENV.API_URL}/tournaments.json`;
  }

  public async save({ name }: ITournamentFields, defenders: Array<UserModel>, attackers: Array<UserModel>): Promise<{}> {
    const defenderIds = defenders.map(defender => defender.id);
    const attackerIds = attackers.map(attacker => attacker.id);

    return new Promise((resolve, reject) => {
      this.http.post(`${this.endpoint}`, { tournament: { name, defenders: defenderIds, attackers: attackerIds } })
        .subscribe((data) => {
          resolve(data);
        }, err => reject(err));
    });
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
