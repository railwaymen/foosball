import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ENV } from '@app/env'
import { TokenProvider } from '../token/token';

@Injectable()
export class GamesProvider {

  endpoint: string;

  constructor(public http: Http, public tokenProvider: TokenProvider) {
    this.endpoint = `${ENV.API_URL}/games.json`
  }

   save(params) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.endpoint}`, params, this.tokenProvider.requestOptions())
        .subscribe(data => {
          resolve(data);
        }, err => reject(err));
    });
  }

}
