import Page from '../../common/Page';
import AppController from './products/controller/controller';
import Cards from './products/cards/Cards';
import Filters from './Filters/Filters';
import {ProductType} from '../../types/types';

export type FilterStateType = {
  categories: Array<string>;
  brands: Array<string>;
  price: Array<number>;
  stock: Array<number>;
  state: Array<ProductType>;
  filter: Array<ProductType>;
  setCategory: (str: string) => void;
  setBrand: (str: string) => void;
  setPrice: (str: number) => void;
  setStock: (str: number) => void;
  setState: (arr: Array<ProductType>) => void;
  setFilter: (arr: Array<ProductType>) => void;
};

export const filterState: FilterStateType = {
  categories: [],
  brands: [],
  price: [],
  stock: [],
  state: [],
  filter: [],
  setCategory(category: string) {
    if (!this.categories.some((t) => t === category)) {
      this.categories.push(category);
      this.categories.sort();
    }
  },
  setBrand(brand: string) {
    if (!this.brands.some((t) => t.toLowerCase() === brand.toLowerCase())) {
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
  setState(arr: Array<ProductType>) {
    this.state = [...arr];
  },
  setFilter(arr: Array<ProductType>) {
    this.filter = [...arr];
  },
};

class MainPage extends Page {
  static TextObject = {};
  private controller: AppController;
  private cards: Cards;
  private filter: Filters;
  readonly filterContainer: HTMLElement;
  private state: Array<ProductType>;
  public url: URL;
  public urlParams: URLSearchParams;
  public routerParams: Record<string, string>;
  private filterState: Array<ProductType>;

  constructor(id: string) {
    super(id);
    this.controller = new AppController();
    this.state = [];
    this.filterState = [];
    this.cards = new Cards();
    this.filterContainer = this.getSection('filters__section');
    this.routerParams = window.location.search === '' ? {} : this.getSearchParams();
    this.url = new URL('http://localhost:5333/');
    this.urlParams = new URLSearchParams(window.location.search);
    this.filter = new Filters(this.routerParams);
  }

  getSearchParams() {
    return window.location.search.slice(window.location.search.indexOf('?') + 1).split('&')
      .reduce((params, hash) => {
        hash.replace('+', ' ');
        let [key, val] = hash.split('=');
        return Object.assign(params, {[key]: decodeURIComponent(val).replace('+', ' ')});
      }, {});
  }

  getFilterQueryState() {
    this.filterState = this.state;
    if (this.routerParams.hasOwnProperty('category')) {
      this.filterState = this.filterState.filter((t) => {
        if (this.routerParams.category.split('↕').some(el => el === t.category)) {
          return t;
        }
      });
    }
    if (this.routerParams.hasOwnProperty('brand')) {
      this.filterState = this.filterState.filter((t) => {
        if (this.routerParams.brand.split('↕').some(el => el === t.brand)) {
          return t;
        }
      });
    }
    if (this.routerParams.hasOwnProperty('price')) {
      this.filterState = [...this.filterState].filter((t) => {
        if (t.price >= Number(this.routerParams.price.split('↕')[0])
          && t.price <= Number(this.routerParams.price.split('↕')[1])) {
          return t;
        }
      });
    }
    if (this.routerParams.hasOwnProperty('stock')) {
      this.filterState = [...this.filterState].filter(t => {
        if (t.stock >= Number(this.routerParams.stock.split('↕')[0])
          && t.stock <= Number(this.routerParams.stock.split('↕')[1])) {
          return t;
        }
      });
    }
  }

  inputEvent(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target) {
      const data = this.filterState.filter((obj) => {
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

  addEventListener() {
    const allCheckboxes = this.filterContainer.querySelectorAll('.checkbox__input');
    allCheckboxes.forEach((t, i) => {
      t.addEventListener('click', (e) => {
        this.addCheckboxFilter(e);
      });
    });

    const rangeInputs1 = this.filterContainer.querySelectorAll('.slider-1');
    const rangeInputs2 = this.filterContainer.querySelectorAll('.slider-2');
    rangeInputs1.forEach((t, i) => {
      t.addEventListener('click', (e) => {
        this.addRangeFilter(e, i);
      });
    });
    rangeInputs2.forEach((t, i) => {
      t.addEventListener('click', (e) => {
        this.addRangeFilter(e, i);
      });
    });
  }

  addCheckboxFilter(e: Event) {
    const target = e.target as HTMLInputElement;
    const typeOfCheckbox = target.parentElement?.parentElement?.parentElement?.classList.toString();
    const targetTitle = target.nextElementSibling?.textContent;
    if (target.checked) {
      if (this.routerParams.hasOwnProperty(`${typeOfCheckbox}`)) {
        this.routerParams = {...this.routerParams, [`${typeOfCheckbox}`]: this.routerParams[`${typeOfCheckbox}`] + '↕' + targetTitle};
      } else {
        if (targetTitle) {
          this.routerParams = {...this.routerParams, [`${typeOfCheckbox}`]: targetTitle};
        }
      }
    } else {
      if (targetTitle) {
        let newCategoryTextArr = this.routerParams[`${typeOfCheckbox}`].split('↕').filter(t => t !== targetTitle);
        if (newCategoryTextArr.length === 0) {
          console.log(newCategoryTextArr);
          delete this.routerParams[`${typeOfCheckbox}`]
          if (!Object.keys(this.routerParams).length) {
            this.urlParams = new URLSearchParams(this.routerParams);
            this.url.search = this.urlParams.toString();
            history.pushState('', '', window.location.origin);
          }
        } else {
          let newCategoryText = newCategoryTextArr.join('↕');
          this.routerParams = {...this.routerParams, [`${typeOfCheckbox}`]: newCategoryText};
        }
      }
    }
    this.urlParams = new URLSearchParams(this.routerParams);
    this.url.search = this.urlParams.toString();
    history.pushState('', '', this.url.search);
    this.getFilterQueryState()
    this.toUpdateCheckboxSpan();
    this.cards.drawProducts(this.filterState);
  }

  toUpdateCheckboxSpan() {
    this.filterContainer.querySelectorAll('.checkbox-line').forEach((el) => {
      (el.lastElementChild as HTMLSpanElement).innerHTML = '';
      (el.lastElementChild as HTMLSpanElement).textContent = `(${this.filter.checkbox.countOfProductsAll(
        this.filterState,
        (el.firstChild as HTMLInputElement).id.slice(0, -1),
        el.parentNode as HTMLElement
      )}/${this.filter.checkbox.countOfProductsAll(
        this.state,
        (el.firstChild as HTMLInputElement).id.slice(0, -1),
        el.parentNode as HTMLElement
      )})`;
    });
  }

  addRangeFilter(e: Event, i: number) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    let typeOfRange: string | undefined = target.parentElement?.classList[1].split('-')[0];
    let a = target.classList.toString() === 'slider-1' ?
      [target.value, (target.nextElementSibling as HTMLInputElement).value]
      : [(target.previousElementSibling as HTMLInputElement).value, target.value];
    if (typeOfRange) {
      this.routerParams = {...this.routerParams, [typeOfRange]: a.join('↕')};
    }
    this.urlParams = new URLSearchParams(this.routerParams);
    this.url.search = this.urlParams.toString();
    history.pushState('', '', this.url.search);
    this.getFilterQueryState();
    this.cards.drawProducts(this.filterState);
    this.toUpdateCheckboxSpan();
  }

  render() {
    this.container.append(this.filterContainer);
    this.filterContainer.append(this.filter.init());
    this.container.append(this.getSection('cards__section'));
    this.controller.getSources((data) => {
      if (data) {
        this.state = [...data];
        filterState.setState(data);
        window.location.search === ''
          ? this.filterState = [...data]
          : this.getFilterQueryState();
        data.forEach((t) => {
          filterState.setCategory(t.category);
          filterState.setBrand(t.brand);
          filterState.setPrice(t.price);
          filterState.setStock(t.stock);
        });
        this.filter.checkbox.getCheckboxes(
          this.filter.categoryFilterList.lastElementChild as HTMLElement,
          filterState.categories,
          'category__checkbox_span',
          this.filterState
        );
        this.filter.checkbox.getCheckboxes(
          this.filter.brandFilterList.lastElementChild as HTMLElement,
          filterState.brands,
          'brand__checkbox_span',
          this.filterState
        );
        this.filter.range.getDoubleRange(
          'price-container',
          this.filter.priceFilterList.lastElementChild as HTMLElement,
          filterState.price[0].toString(),
          filterState.price[filterState.price.length - 1].toString(),
        );
        this.filter.range.getDoubleRange(
          'stock-container',
          this.filter.stockFilterList.lastElementChild as HTMLElement,
          filterState.stock[0].toString(),
          filterState.stock[filterState.stock.length - 1].toString(),
        );
        this.cards.drawProducts(this.filterState);
        this.addEventListener();
      }
    });
    const inputSearch = document.querySelector('input') as HTMLElement;
    inputSearch.addEventListener('input', (e) => this.inputEvent(e));
    return this.container;
  }
}

export default MainPage;
