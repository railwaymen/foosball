import { TournamentFormPage } from './tournament-form';
import { UserModel } from '../../models/user-model';

export interface ITournamentFormState {
  onUserTap(component : TournamentFormPage, user: UserModel) : void;
  unSubmit() : ITournamentFormState;
  showBack() : boolean;
  shouldShowUser(component : TournamentFormPage, user : UserModel) : boolean;
  showSave() : boolean;
  showSubmit(component : TournamentFormPage) : boolean;
  submit() : ITournamentFormState;
  submitText() : string;
  message() : string;
}
