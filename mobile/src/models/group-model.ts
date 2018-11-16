import { IGroup, IGroupTeam } from './../pages/groups/groups.interfaces';

export class GroupModel implements IGroup {

  public constructor(public id: number, public name: string, public teams: Array<IGroupTeam>, public tournament_id: number){

  }
}
