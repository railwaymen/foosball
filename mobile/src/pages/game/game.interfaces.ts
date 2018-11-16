import { Alert } from 'ionic-angular';

export interface IUser {
  firstName: string,
  id: number,
  lastName: string
}
export interface IUserModel extends IUser {
  position: string,
  team: 'blue' | 'red'
}
export interface IPlayerData {
  team: 'blue' | 'red',
  player: string
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
  player: IUserModel
}
