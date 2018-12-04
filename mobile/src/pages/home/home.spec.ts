import { UsersProvider } from './../../providers/users/users';
import { HomePage } from './home';
import {} from 'jasmine';
import { async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, AlertController, LoadingController } from 'ionic-angular';
import { LoadingControllerMockExtended, AlertControllerMock, UsersProviderMock } from '../../providers/test/mocks-ionic';
import { Http } from '@angular/http';
import { NavMock } from '../../providers/test/mocks-ionic';
import { By } from '@angular/platform-browser';
import { TokenProvider } from '../../providers/token/token';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserModel } from '../../models/user-model';


describe('Component: Home', () => {

  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  const fillUpUsersQueue = () => {
    component.users.forEach(user => {
      component.addPlayer(user);
    });
  }

  beforeEach(async() => {

    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(this),
      ],
      providers: [
        TokenProvider,
        { provide: AlertController, useClass: AlertControllerMock },
        { provide: LoadingController, useClass: LoadingControllerMockExtended },
        { provide: NavController, useClass: NavMock },
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        { provide: UsersProvider, useClass: UsersProviderMock}
      ],

      schemas: [ NO_ERRORS_SCHEMA ]
    }).overrideComponent(HomePage, {
      set: {
        providers: [
          { provide: UsersProvider, useClass: UsersProviderMock }
        ]
      },
    })
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    component.users = [{
      "id": 0,
      "firstName": "Arnold",
      "lastName": "Boczek"
    },
    {
      "id": 1,
      "firstName": "Ferdynand",
      "lastName": "Kiepski"
    },
    {
      "id": 2,
      "firstName": "Marian",
      "lastName": "Pazdzioch"
    },
    {
      "id": 3,
      "firstName": "John",
      "lastName": "Doe"
    },
    {
      "id": 4,
      "firstName": "Edzio",
      "lastName": "Listonosz"
    }].map((user) => {
      return new UserModel(user.id, user.firstName, user.lastName);
    });

    fixture.whenStable().then(() => {
      fixture.detectChanges();
    })
  }));

  it ('Has Users', fakeAsync(() => {
    expect(component.users.length).toBeGreaterThan(0);
  }));

  it ('Creates instance', fakeAsync(() => {
    expect(component instanceof HomePage).toBeTruthy();
  }));

  it ('Renders player list', fakeAsync(() => {
    const element = fixture.debugElement.queryAll(By.css('ion-card'))
    expect(element.length).toBeGreaterThan(0);
  }));

  it ('Adds player to queue on tap', fakeAsync(() => {
    const playerCard = fixture.debugElement.query(By.css('ion-col'));
    spyOn(component, 'addPlayer');
    playerCard.triggerEventHandler('tap', null);
    tick();
    fixture.detectChanges();
    expect(component.addPlayer).toHaveBeenCalled();
  }));

  it ('Toggles player presence in queue array', () => {
    component.addPlayer(component.users[0]);
    expect(component.players.length).toBe(1);
    component.addPlayer(component.users[0]);
    expect(component.players.length).toBe(0);
  });

  it ('Adds max 4 players to queue', () => {
    fillUpUsersQueue();
    expect(component.players.length).toBe(4);
  });

  it ('Hides button when team is uncomplete', fakeAsync(() => {
    expect(fixture.debugElement.queryAll(By.css('.start-game-button')).length).toBe(0);
    fillUpUsersQueue();
    tick();
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.start-game-button')).length).toBeGreaterThan(0);
  }));

});
