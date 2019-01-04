import AttackersState from './attackers-state';
import { ITournamentFormState } from './tournament-form-state.interface';
import { TournamentFormPage } from './tournament-form';
import { UserModel } from '../../models/user-model';

export default class DoneState implements ITournamentFormState {
  public onUserTap(component : TournamentFormPage, user : UserModel) : void {
    return;
  }
  public unSubmit() : ITournamentFormState {
    return new AttackersState() as ITournamentFormState;
  }
  public showBack() : boolean {
    return true;
  }

  public shouldShowUser(component : TournamentFormPage, user : UserModel) : boolean {
    return component.isDefender(user) || component.isAttacker(user);
  }
  public submit() : ITournamentFormState {
    return this as ITournamentFormState;
  }
  public showSubmit(component : TournamentFormPage) : boolean {
    return false;
  }
  public submitText() : string {
    return '';
  }
  public message() : string {
    return 'Submit form';
  }
  public showSave() : boolean {
    return true;
  }
}
