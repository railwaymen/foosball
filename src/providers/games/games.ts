import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GamesProvider {

  endpoint: string;

  constructor(public http: Http) {
    this.endpoint = 'http://localhost:3000/games';
  }

   save(params) {
    return new Promise(resolve => {
      this.http.post(`${this.endpoint}`, params)
        .subscribe(data => {
          resolve(data);
        });
    });
  }

}
