import Page from '../../common/Page';
import AppController from './products/controller/controller';
import Cards from './products/cards/Cards';
import Filters from './Filters/Filters';
import { ProductType } from '../../types/types';

export type FilterStateType = {
  categories: Array<string>;
  brands: Array<string>;
  price: Array<number>;
  stock: Array<number>;
  setCategory: (str: string) => void;
  setBrand: (str: string) => void;
  setPrice: (str: number) => void;
  setStock: (str: number) => void;
};

export const filterState: FilterStateType = {
  categories: [],
  brands: [],
  price: [],
  stock: [],
  setCategory(category: string) {
    if (!this.categories.some((t) => t === category)) {
      this.categories.push(category);
      this.categories.sort();
    }
  },
  setBrand(brand: string) {
    if (!this.brands.some((t) => t === brand)) {
      this.brands.push(brand);
      this.brands.sort();
    }
  },
  setPrice(price: number) {
    if (!this.price.some((t) => t === price)) {
      this.price.push(price);
    }
    this.price.sort((a, b) => a - b);
  },
  setStock(stock: number) {
    if (!this.stock.some((t) => t === stock)) {
      this.stock.push(stock);
    }
    this.stock.sort((a, b) => a - b);
  },
};

class MainPage extends Page {
  static TextObject = {};
  private controller: AppController;
  private cards: Cards;
  private filter: Filters;
  readonly filterContainer: HTMLElement;
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
        data.forEach((t) => {
          filterState.setCategory(t.category);
          filterState.setBrand(t.brand);
          filterState.setPrice(t.price);
          filterState.setStock(t.stock);
        });
        this.filter.checkbox.getCheckboxes(
          this.filter.categoryFilterList.lastElementChild as HTMLElement,
          filterState.categories
        );
        this.filter.checkbox.getCheckboxes(
          this.filter.brandFilterList.lastElementChild as HTMLElement,
          filterState.brands
        );
        this.filter.range.getDoubleRange(
          this.filter.priceFilterList.lastElementChild as HTMLElement,
          filterState.price[0].toString(),
          filterState.price[filterState.price.length - 1].toString()
        );
        this.filter.range.getDoubleRange(
          this.filter.stockFilterList.lastElementChild as HTMLElement,
          filterState.stock[0].toString(),
          filterState.stock.reverse()[0].toString()
        );
        this.cards.drawProducts(data);
      }
    });
    const inputSearch = document.querySelector('input') as HTMLElement;
    inputSearch.addEventListener('input', (e) => this.inputEvent(e));
    return this.container;
  }
}

export default MainPage;
