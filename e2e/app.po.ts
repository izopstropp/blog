import { browser, by, element } from 'protractor';

export class BlogPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('bbl-root h1')).getText();
  }
}
