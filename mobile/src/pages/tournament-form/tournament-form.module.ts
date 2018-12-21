import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TournamentFormPage } from './tournament-form';

@NgModule({
  declarations: [
    TournamentFormPage,
  ],
  imports: [
    IonicPageModule.forChild(TournamentFormPage),
  ],
})
export class TournamentFormPageModule {}
