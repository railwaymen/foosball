import { TournamentFormPage } from './tournament-form';
import { UserModel } from '../../models/user-model';

export interface ITournamentFormState {
  onUserTap(component : TournamentFormPage, user: UserModel) : void;
  unSubmit() : ITournamentFormState;
  shouldShowBack() : boolean;
  shouldShowUser(component : TournamentFormPage, user : UserModel) : boolean;
  shouldShowSave() : boolean;
  showSubmit(component : TournamentFormPage) : boolean;
  submit() : ITournamentFormState;
  submitText() : string;
  message() : string;
}
