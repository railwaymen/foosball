import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { ENV } from '@app/env';
import jsonwebtoken from 'jsonwebtoken';

@Injectable()
export class TokenProvider {

  public get(): string {
    return jsonwebtoken.sign({client_id: ENV.API_CLIENT_SECRET}, ENV.API_CLIENT_SECRET, { algorithm: 'HS256', expiresIn: 60 });
  }

  public requestOptions(): RequestOptions {
    const headers = new Headers({ 'Authorization': 'Token token=' + this.get() + ', client_id=' + ENV.API_CLIENT_ID });

    return new RequestOptions({ headers: headers });
  }

}
