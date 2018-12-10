import { IUser } from './../pages/game/game.interfaces';
import _ from 'lodash';

export class UserModel implements IUser {

  public constructor(public id: number, public firstName: string, public lastName: string, public elo_rating?: number, public elo_rating_defender?: number, public elo_rating_attacker?: number, public team?: 'blue' | 'red', public position?: string){

  }

  public name(): string {
    return this.firstName + ' ' + this.lastName;
  }

  public switchTeam(): void{
    if (!_.includes(['red', 'blue'], this.team)) return;
    this.team = this.team === 'blue' ? 'red' : 'blue';
  }
}
