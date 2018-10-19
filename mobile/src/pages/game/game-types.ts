export type Team = 'blue' | 'red';

export type TeamDictionary<T> = _.Dictionary<T> & {
  [index in Team]: T;
};

export interface IPlayer {
  id: number;
  goals: number;
  team: Team;
}
