// tslint:disable:typedef
import { browser, by, element } from 'protractor';

export class PHomePage {

  public navigateTo(destination: string) {

    return browser.get(destination);
  }

  public getTitle() {

    return browser.getTitle();
  }

  public getFirstTitleText() {

    return element(by.css('.toolbar-title')).getAttribute('textContent');
  }
}
