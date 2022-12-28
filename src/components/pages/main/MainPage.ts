import Page from '../../common/Page';
import AppController from './products/controller/controller';
import Cards from './products/cards/Cards';
import Filters from './Filters/Filters';

class MainPage extends Page {
  static TextObject = {};
  private controller: AppController;
  private cards: Cards;
  private filter: Filters;
  private filterContainer: HTMLElement;

  constructor(id: string) {
    super(id);
    this.controller = new AppController();
    this.cards = new Cards();
    this.filterContainer = this.getSection('filters__section')
    this.filter = new Filters()
  }
  inputEvent(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target) {
      this.controller = new AppController();
      this.controller.getSources((data) => {
        this.cards.drawProducts(data);
        return this.container;
      }, target.value);
    }
  }
  getSection(className: string) {
    const section = document.createElement('section');
    section.classList.add(className);
    return section
  }
  render() {
    this.container.append(this.filterContainer)
    this.filterContainer.append(this.filter.init())
    this.container.append(this.getSection('cards__section'))
    this.controller.getSources((data) => {
      this.cards.drawProducts(data);
    });
    (document.querySelector('input') as HTMLElement)
      .addEventListener('input', (e) => this.inputEvent(e));
    return this.container;
  }
}

export default MainPage;
