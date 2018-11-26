import { HomePage } from './home';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [],
  imports: [IonicPageModule.forChild(HomePage)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [HomePage]
})


export class HomePageModule {}
