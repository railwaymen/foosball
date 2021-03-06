import { Alert } from 'ionic-angular';
import { UserModel } from '../../models/user-model';

export interface IUser {
  firstName: string,
  id: number,
  lastName: string,
  elo_rating?: number,
  elo_rating_defender?: number,
  elo_rating_attacker?: number
}
export interface IUserPlayer extends IUser {
  position: string,
  team: 'blue' | 'red'
}

export interface IUserApi {
  id: number,
  first_name: string,
  last_name: string,
  elo_rating: number,
  elo_rating_defender: number,
  elo_rating_attacker: number
}
export interface IPlayerData {
  team: 'blue' | 'red',
  player: string
}
export interface IGameHistory {
  blue: Array<UserModel>,
  red: Array<UserModel>
}
export interface IAlertMessage {
  [key: string]: Alert
}
export interface IScore {
  red: number,
  blue: number
}
export interface IUserResult {
  player_id: number,
  team: 'blue' | 'red',
  position: number,
  gols: number,
  own_gols: number
}

export interface ISwipeEvent {
  direction: number
}

export interface IOnGoalInfo {
  own: boolean,
  player: UserModel
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
  goals: number,
  own_goals: number
}
