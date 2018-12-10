import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RankingPage } from './ranking';
import { UserInfoComponent } from '../../components/user-info/user-info';

@NgModule({
  declarations: [
    RankingPage,
    UserInfoComponent
  ],
  imports: [
    IonicPageModule.forChild(RankingPage),
  ],
})
export class RankingPageModule {}
