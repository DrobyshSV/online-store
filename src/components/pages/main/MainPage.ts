import Page from '../../common/Page';
import AppController from './products/controller/controller';
import Cards from './products/cards/Cards';

class MainPage extends Page {
  static TextObject = {};
  private controller: AppController;
  private cards: Cards;

  constructor(id: string) {
    super(id);
    this.controller = new AppController();
    this.cards = new Cards();
  }

  render() {
    this.controller.getSources((data) => {
      this.cards.drawProducts(data);
    });
    return this.container;
  }
}

export default MainPage;
