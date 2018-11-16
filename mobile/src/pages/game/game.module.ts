import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GamePage } from './game';
import { PlayerGoalSliderComponent } from '../../components/player-goal-slider/player-goal-slider';

@NgModule({
  declarations: [
    GamePage,
    PlayerGoalSliderComponent
  ],
  imports: [
    IonicPageModule.forChild(GamePage),
  ]
})
export class GamePageModule {}
