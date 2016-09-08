import { TicTacGamePage } from './app.po';

describe('tic-tac-game App', function() {
  let page: TicTacGamePage;

  beforeEach(() => {
    page = new TicTacGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
