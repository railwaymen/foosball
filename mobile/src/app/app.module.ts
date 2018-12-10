import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
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
import { GameListPage } from '../pages/game-list/game-list';
import { GameListPageModule } from '../pages/game-list/game-list.module';
import { GroupsPage } from '../pages/groups/groups';
import { GroupsPageModule } from '../pages/groups/groups.module';
import { UsersProvider } from '../providers/users/users';
import { GamesProvider } from '../providers/games/games';
import { GroupsProvider } from '../providers/groups/groups';
import { TournamentsProvider } from '../providers/tournaments/tournaments';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { TournamentsPageModule } from '../pages/tournaments/tournaments.module';
import { RankingPage } from '../pages/ranking/ranking';
import { RankingPageModule } from '../pages/ranking/ranking.module';
import { UserInfoComponent } from '../components/user-info/user-info';
import { AuthService } from '../auth/auth.service';
import { TokenInterceptor } from '../auth/token.interceptor';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GamePageModule,
    GameListPageModule,
    GroupsPageModule,
    TournamentsPageModule,
    RankingPageModule,
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
    GameListPage,
    GroupsPage,
    TournamentsPage,
    RankingPage,
    UserInfoComponent
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TournamentsProvider,
    UsersProvider,
    GamesProvider,
    GroupsProvider,
    HttpClient
  ]
})
export class AppModule {}
