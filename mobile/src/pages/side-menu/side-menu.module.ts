import { NgModule } from '@angular/core';
import { SideMenu } from './side-menu';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    SideMenu,
  ],
  imports: [
    IonicModule
  ],
  exports: [
    SideMenu
  ]
})
export class SideMenuModule {}
