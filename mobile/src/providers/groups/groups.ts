import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { GroupModel } from '../../models/group-model';
import { ENV } from '@app/env';
import { TokenProvider } from '../token/token';

@Injectable()
export class GroupsProvider {

  public data: Array<any> = [];
  public endpoint: string;

  public constructor(public http: Http, public tokenProvider: TokenProvider) {
    this.endpoint = `${ENV.API_URL}/tournaments/1/groups.json`
  }

  public load(params={}) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.endpoint}`, this.tokenProvider.requestOptions())
        .map(res => res.json())
        .subscribe(data => {
          this.data = [];
          for (let row of data) {
            this.data.push(
              new GroupModel(row.id, row.name, row.teams, row.tournament_id)
            )
          }
          resolve(this.data);
        }, err => reject(err));
    });
  }
}
