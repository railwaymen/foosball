import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { ENV } from '@app/env'
import jsonwebtoken from 'jsonwebtoken';

@Injectable()
export class TokenProvider {

  constructor() {
  }

  get() {
    return jsonwebtoken.sign({client_id: ENV.API_CLIENT_SECRET}, ENV.API_CLIENT_SECRET, { algorithm: 'HS256', expiresIn: 60 });
  }

  requestOptions() {
    let headers = new Headers({ 'Authorization': 'Token token=' + this.get() + ', client_id=' + ENV.API_CLIENT_ID });
    return new RequestOptions({ headers: headers });
  }

}
