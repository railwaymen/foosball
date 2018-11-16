import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import {UserModel} from '../../models/user-model';
import { ENV } from '@app/env'
import { TokenProvider } from '../token/token';

@Injectable()
export class UsersProvider {

  data: Array<any>=[];
  endpoint: string;

  constructor(public http: Http, public tokenProvider: TokenProvider) {
    this.endpoint = `${ENV.API_URL}/players.json`
  }

  public load(params = {}) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.endpoint}`, this.tokenProvider.requestOptions())
        .map(res => res.json())
        .subscribe(data => {
          this.data = [];
          for (let row of data) {
            this.data.push(
              new UserModel(row.id, row.first_name, row.last_name)
            );
          }
          resolve(this.data);
        }, err => reject(err));
    });
  }

}
