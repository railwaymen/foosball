import { Alert } from 'ionic-angular';

export interface IUser {
  firstName: string,
  id: number,
  lastName: string
}
export interface IUserPlayer extends IUser {
  position: string,
  team: 'blue' | 'red'
}
export interface IGameHistory {
  blue: Array<string>,
  red: Array<string>,
  own: {
    blue: Array<string>,
    red: Array<string>
  }
}
export interface IAlertMessage {
  [key: string]: Alert
}
export interface IScore {
  red: number,
  blue: number
}

export interface ISwipeEvent {
  direction: number
}

export interface IOnGoalInfo {
  own: boolean,
  player: IUserPlayer
}

export interface IGame {
  red_attacker_id: number,
  red_defender_id: number,
  blue_attacker_id: number,
  blue_defender_id: number,
  blue_score: number,
  red_score: number,
  started_at: Date,
  finished_at: Date,
  group_id: number,
  games_players_attributes: Array<IGamePlayer>
}

export interface IGamePlayer {
  player_id: number,
  team: string,
  position: string,
  gols: number,
  own_gols: number
}
