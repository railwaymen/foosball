import _ from 'lodash';
import { IPlayer } from '../pages/game-list/game-list.interfaces';

export class GameModel {
  public constructor(public id: number, public red_score: number, public blue_score: number, public created_at: string, public players: Array<IPlayer>){

  }

  public playerInfo(team: string, position: string): string {
    const player = _.find(this.players, { team: team, position: position });

    return !!player ? this.playerName(player) : '';
  }

  public playerName(player: IPlayer): string {
    const name = `${player.first_name} ${player.last_name}`;
    const goals = player.own_goals > 0 ? `${player.goals} (-${player.own_goals})` : `${player.goals}`;

    return `${name} ${goals}`;
  }
}
