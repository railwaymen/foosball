import { async, TestBed } from '@angular/core/testing';
import { MyApp } from '../../src/app/app.component';
import { IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TokenProvider } from '../../src/providers/token/token';
import { UsersProvider } from '../../src/providers/users/users';
import { GamesProvider } from '../../src/providers/games/games';
import { GroupsProvider } from '../../src/providers/groups/groups';


describe('Root Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyApp
      ],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        StatusBar,
        SplashScreen,
        TokenProvider,
        UsersProvider,
        GamesProvider,
        GroupsProvider
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should be created', () => {
    expect(component instanceof MyApp).toBeTruthy();
  });
});
