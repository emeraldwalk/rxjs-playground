import { RxjsPlaygroundPage } from './app.po';

describe('rxjs-playground App', function() {
  let page: RxjsPlaygroundPage;

  beforeEach(() => {
    page = new RxjsPlaygroundPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
