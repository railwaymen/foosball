import _ from 'lodash';
import { ITournamentFormState } from './tournament-form-state.interface';
import DefendersState from './defenders-state';
import DoneState from './done-state';
import { TournamentFormPage } from './tournament-form';
import { UserModel } from '../../models/user-model';

export default class AttackersState implements ITournamentFormState {
  public onUserTap(component : TournamentFormPage, user : UserModel) : void {
    if (component.isDefender(user))
      return;
    component.attackers = _.xor(component.attackers, [user]);
  }
  public unSubmit() : ITournamentFormState {
    return new DefendersState() as ITournamentFormState;
  }
  public showBack() : boolean {
    return true;
  }
  public showSubmit(component : TournamentFormPage) : boolean {
    return component.attackers.length === component.defenders.length;
  }
  public shouldShowUser(component : TournamentFormPage, user : UserModel) : boolean {
    return !component.isDefender(user);
  }
  public submit() : ITournamentFormState {
    return new DoneState() as ITournamentFormState;
  }
  public submitText() : string {
    return 'Submit Attackers';
  }
  public message() : string {
    return 'Choose attackers';
  }
  public showSave() : boolean {
    return false;
  }
}
