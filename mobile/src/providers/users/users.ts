import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import {UserModel} from '../../models/user-model';
import { ENV } from '@app/env'

@Injectable()
export class UsersProvider {

  data: Array<any>=[];
  endpoint: string;

  constructor(public http: Http) {
    this.endpoint = `${ENV.API_URL}/players.json`
  }

  load(params={}) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.endpoint}`)
        .map(res => res.json())
        .subscribe(data => {
          this.data = [];
          for (let row of data) {
            this.data.push(
              new UserModel(row.id, row.first_name, row.last_name)
            )
          }
          resolve(this.data);
        }, err => reject(err));
    });
  }

}
