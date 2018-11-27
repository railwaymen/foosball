import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserDetailPage } from '../pages/user-detail/user-detail';
import { UserDetailPageModule } from '../pages/user-detail/user-detail.module';
import { GamePage } from '../pages/game/game';
import { GamePageModule } from '../pages/game/game.module';
import { GroupsPage } from '../pages/groups/groups';
import { GroupsPageModule } from '../pages/groups/groups.module';
import { TokenProvider } from '../providers/token/token';
import { UsersProvider } from '../providers/users/users';
import { GamesProvider } from '../providers/games/games';
import { GroupsProvider } from '../providers/groups/groups';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    GamePageModule,
    GroupsPageModule,
    UserDetailPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserDetailPage,
    GamePage,
    GroupsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TokenProvider,
    UsersProvider,
    GamesProvider,
    GroupsProvider
  ]
})
export class AppModule {}
