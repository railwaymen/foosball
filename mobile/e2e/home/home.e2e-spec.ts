import {} from 'jasmine';
import { PHomePage } from './home.po';

describe('Home Page', () => {
  let page: PHomePage;

  beforeEach(() => {
    page = new PHomePage();
  });

  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it('should have a title saying "Menu"', () => {
      page.getFirstTitleText().then(title => {
        expect(title).toBe('Menu');
      });
    });
  })
});
