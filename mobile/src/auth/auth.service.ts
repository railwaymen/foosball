import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import jsonwebtoken from 'jsonwebtoken';
import { ENV } from '@app/env';

@Injectable()
export class AuthService {
  public getToken(): string {
    return jsonwebtoken.sign({client_id: ENV.API_CLIENT_SECRET}, ENV.API_CLIENT_SECRET, { algorithm: 'HS256', expiresIn: 60 });
  }

  public isAuthenticated(): boolean {

    const token = this.getToken();

    return tokenNotExpired(null, token);
  }
}
