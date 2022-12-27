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
    const sectionCards = document.createElement('section');
    sectionCards.classList.add('cards__section');
    const filtersSection = document.createElement('section');
    filtersSection.classList.add('filters__section');
    this.container.append(filtersSection, sectionCards);
    this.controller.getSources((data) => {
      this.cards.drawProducts(data);
    });
    (document.querySelector('input') as HTMLElement).addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      if (target) {
        this.controller = new AppController();
        this.controller.getSources((data) => {
          this.cards.drawProducts(data);
          return this.container;
        }, target.value);
      }
    });

    return this.container;
  }
}

export default MainPage;
