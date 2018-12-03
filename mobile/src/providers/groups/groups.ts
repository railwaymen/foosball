import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { GroupModel } from '../../models/group-model';
import { ENV } from '@app/env';
import { TokenProvider } from '../token/token';

@Injectable()
export class GroupsProvider {

  private data: Array<GroupModel> = [];
  private readonly endpoint: (tournamentId : number) => string;

  public constructor(public http: Http, public tokenProvider: TokenProvider) {
    this.endpoint = (tournamentId : number) => `${ENV.API_URL}/tournaments/${tournamentId}/groups.json`;
  }

  public async load(tournamentId : number): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.http.get(this.endpoint(tournamentId), this.tokenProvider.requestOptions())
        .map(res => res.json())
        .subscribe(data => {
          this.data = [];
          for (const row of data) {
            this.data.push(
              new GroupModel(row.id, row.name, row.teams, row.tournament_id)
            );
          }
          resolve(this.data);
        }, err => reject(err));
    });
  }
}
