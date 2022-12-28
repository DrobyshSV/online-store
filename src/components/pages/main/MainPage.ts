import Page from '../../common/Page';
import AppController, { ProductType } from './products/controller/controller';
import Cards from './products/cards/Cards';
import Filters from './Filters/Filters';

class MainPage extends Page {
  static TextObject = {};
  private controller: AppController;
  private cards: Cards;
  private filter: Filters;
  private filterContainer: HTMLElement;
  public state: Array<ProductType>;

  constructor(id: string) {
    super(id);
    this.controller = new AppController();
    this.state = this.controller.state;
    this.cards = new Cards();
    this.filterContainer = this.getSection('filters__section');
    this.filter = new Filters();
  }

  inputEvent(e: Event) {
    this.state = this.controller.state;
    const target = e.target as HTMLInputElement;
    if (target) {
      const data = this.state.filter((obj) => {
        if (
          obj.brand.toLowerCase().includes(target.value.toLowerCase()) ||
          obj.price.toString().toLowerCase().includes(target.value.toLowerCase()) ||
          obj.title.toLowerCase().includes(target.value.toLowerCase()) ||
          obj.description.toLowerCase().includes(target.value.toLowerCase()) ||
          obj.category.toLowerCase().includes(target.value.toLowerCase())
        ) {
          return obj;
        }
      });
      this.cards.drawProducts(data);
    }
  }

  getSection(className: string) {
    const section = document.createElement('section');
    section.classList.add(className);
    return section;
  }

  render() {
    this.container.append(this.filterContainer);
    this.filterContainer.append(this.filter.init());
    this.container.append(this.getSection('cards__section'));
    this.controller.getSources((data) => {
      if (data) {
        this.cards.drawProducts(data);
      }
    });
    (document.querySelector('input') as HTMLElement)
      .addEventListener('input', (e) => this.inputEvent(e));
    return this.container;
  }
}

export default MainPage;
