export interface IGroup {
  id: number,
  name: string,
  teams: Array<IGroupTeam>,
  tournament_id: number
}
export interface IGroupTeam {
  id: number,
  attacker_id: number,
  attacker_first_name: string,
  attacker_last_name: string,
  defender_id: number,
  defender_first_name: string,
  defender_last_name: string

}
