import _ from 'lodash';

export class GameModel {
  constructor(public id: number, public red_score: number, public blue_score: number, public created_at: string, public players: Array<any>){

  }

  findPlayer(team: string, position: string) {
    let player = _.find(this.players, { team: team, position: position });
    return !!player ? this.playerName(player) : '';
  }

  playerName(player: any) {
    let name = `${player.first_name} ${player.last_name}`
    let gols = player.own_gols > 0 ? `${player.gols} (-${player.own_gols})` : `${player.gols}`
    return `${name} ${gols}`;
  }
}
