import { IUser } from './../pages/game/game.interfaces';

export class UserModel implements IUser {

  public constructor(public id: number, public firstName: string, public lastName: string) {

  }

  public name(): string {
    return this.firstName + ' ' + this.lastName;
  }
}
