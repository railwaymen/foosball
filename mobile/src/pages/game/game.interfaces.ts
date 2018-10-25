export interface IPlayer {
  firstName: string,
  id: number,
  lastName: string,
  position: string,
  team: string
}
export interface IPlayerData {
  team: string,
  player: string
}
export interface IGameHistory {
  blue: Array<string>,
  red: Array<string>,
  own: object
}
