// tslint:disable:no-any
import { TokenProvider } from '../token/token';
import { Http } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingControllerMock } from 'ionic-mocks';
import { UserModel } from '../../models/user-model';

abstract class BaseMock {

  protected spyObj: any;

  public constructor(baseName: string, methodNames: any[]) {
      this.spyObj = jasmine.createSpyObj(baseName, methodNames);

      methodNames.forEach(methodName => {
          this[methodName] = this.spyObj[methodName];
      });
  }
}
export class AlertControllerMock {
  public create(): Object {
    const alertObj = {
      present: () => {
        return true;
      }
    }
    return  alertObj;
  }
  public presentAlert(): Promise<boolean> {

    return new Promise((resolve) => {
      resolve(true);
    })
  }

}
export class PlatformMock {
  public ready(): Promise<string> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  public getQueryParam(): boolean {
    return true;
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public is(): boolean {
    return true;
  }

  public getElementComputedStyle(container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any): any {
    return callback;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout(id: any): any {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement'];
  }
}

export class StatusBarMock extends StatusBar {
  public styleDefault(): any {
    return;
  }
}

export class SplashScreenMock extends SplashScreen {
  public hide(): any {
    return;
  }
}

export class NavMock {
  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }

  public registerChildNav(nav: any): void {
    return ;
  }

}

export class UsersProviderMock {
  public data: Array<any> = [{
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
  }];

  public endpoint: string;
  public http: Http;
  public tokenProvider: TokenProvider;

  public load(): Promise<Array<UserModel>> {

    this.data = this.data.map((user) => {
      return new UserModel(user.id, user.firstName, user.lastName);
    })

    return new Promise((resolve: Function) => {
      resolve(this.data);
    });
  }
}
export class LoadingControllerMockExtended extends LoadingControllerMock {
  public create(): any {
    return new LoadingControllerMockExtended;
  }
  public dismiss(): any {}

  public present(): any {}
}

export class DeepLinkerMock {

}
