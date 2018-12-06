export interface IPlayer {
  team: string,
  position: string,
  goals: number,
  own_goals: number,
  first_name: string,
  last_name: string,
  email: string
  id: number
}

export interface IGame {
  id: number,
  red_score: number,
  blue_score: number,
  created_at: Date,
  players: Array<IPlayer>
}
