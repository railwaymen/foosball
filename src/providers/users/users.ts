import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import _ from 'lodash';
import { Http } from '@angular/http';
import {UserModel} from '../../models/user-model';

/*
  Generated class for the UsersServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

  data: Array<any>=[];
  endpoint: string;

  constructor(public http: Http) {
    this.endpoint = 'http://localhost:3000/users';
  }

  load(params={}) {
    return new Promise(resolve => {
      this.http.get(`${this.endpoint}`)
        .map(res => res.json())
        .subscribe(data => {
          for (let row of data) {
            this.data.push(
              new UserModel(row.id, row.first_name, row.last_name)
            )
          }
          resolve(this.data);
        });
    });
  }

}
