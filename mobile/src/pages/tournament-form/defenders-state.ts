import _ from 'lodash';
import AttackersState from './attackers-state';
import { ITournamentFormState } from './tournament-form-state.interface';
import { TournamentFormPage } from './tournament-form';
import { UserModel } from '../../models/user-model';

export default class DefendersState implements ITournamentFormState {
  public onUserTap(component : TournamentFormPage, user : UserModel) : void {
    if (component.isAttacker(user))
      return;
    component.defenders = _.xor(component.defenders, [user]);
  }
  public unSubmit() : ITournamentFormState {
    return this as ITournamentFormState;
  }
  public showBack() : boolean {
    return false;
  }
  public shouldShowUser(component : TournamentFormPage, user : UserModel) : boolean {
    return !component.isAttacker(user);
  }
  public showSubmit(component : TournamentFormPage) : boolean {
    return component.defenders.length > 1;
  }
  public submit() : ITournamentFormState {
    return new AttackersState() as ITournamentFormState;
  }
  public submitText() : string {
    return 'Submit Defenders';
  }
  public message() : string {
    return 'Choose defenders';
  }
  public showSave() : boolean {
    return false;
  }
}