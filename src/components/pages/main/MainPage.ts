import Page from '../../common/Page';
import AppController from './products/controller/controller';
import Cards from './products/cards/Cards';
import Filters from './Filters/Filters';
import {ProductType} from '../../types/types';
import rangeSlider from './Filters/Range/RangeSlider';

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
  private url: URL;
  private urlParams: URLSearchParams;
  private routerParams: Record<string, string>;

  constructor(id: string) {
    super(id);
    this.controller = new AppController();
    this.state = this.controller.state;
    this.cards = new Cards();
    this.filterContainer = this.getSection('filters__section');
    this.filter = new Filters();
    this.routerParams = {}
    this.url = new URL('http://localhost:5333/');
    this.urlParams = new URLSearchParams(this.routerParams);
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
        const arr = this.getDataForRangeListenerCallback(i);
        this.addRangeFilter(arr, e, i);
      });
    });
    rangeInputs2.forEach((t, i) => {
      t.addEventListener('click', (e) => {
        const arr = this.getDataForRangeListenerCallback(i);
        this.addRangeFilter(arr, e, i);
      });
    });
  }

  getDataForRangeListenerCallback(index: number) {
    const range1 = this.filterContainer.querySelectorAll('.range1');
    const range2 = this.filterContainer.querySelectorAll('.range2');
    const allCheckboxes = this.filterContainer.querySelectorAll('.checkbox__input');
    const arr: Array<ProductType> = [];
    let isAnyCheckedCheckedBox = false;
    allCheckboxes.forEach((t) => {
      if ((t as HTMLInputElement).checked) {
        isAnyCheckedCheckedBox = true;
        return;
      }
    });
    const state = isAnyCheckedCheckedBox ? filterState.filter : filterState.state;
    state.forEach((t) => {
      if (index === 0) {
        if (
          t.price >= Number((range1[index] as HTMLSpanElement).innerText) &&
          t.price <= Number((range2[index] as HTMLSpanElement).innerText)
        ) {
          arr.push(t);
        }
      }
      if (index === 1) {
        if (
          t.stock >= Number((range1[index] as HTMLSpanElement).innerText) &&
          t.stock <= Number((range2[index] as HTMLSpanElement).innerText)
        ) {
          arr.push(t);
        }
      }
    });
    console.log(arr);
    return arr;
  }

  addCheckboxFilter(e: Event) {
    const categoryCheckboxes = this.filter.categoryFilterList.querySelectorAll('.checkbox__input');
    const brandCheckboxes = this.filter.brandFilterList.querySelectorAll('.checkbox__input');

    const categoryArray: Array<string> = [];
    const brandArray: Array<string> = [];
    categoryCheckboxes.forEach((t) => {
      if ((t as HTMLInputElement).checked) {
        categoryArray.push(t.id.slice(0, -1));
      }
    });
    brandCheckboxes.forEach((t) => {
      if ((t as HTMLInputElement).checked) {
        brandArray.push(t.id.slice(0, -1));
      }
    });
    let data = filterState.state.filter((obj) => {
      if (categoryArray.length !== 0) {
        if (categoryArray.includes(obj.category)) {
          return obj;
        }
      } else {
        if (brandArray.length !== 0) {
          if (brandArray.includes(obj.brand)) {
            return obj;
          }
        }
      }
    });
    data = data.filter((obj) => {
      if (brandArray.length !== 0) {
        if (brandArray.includes(obj.brand)) {
          return obj;
        }
      } else {
        if (categoryArray.length !== 0) {
          if (categoryArray.includes(obj.category)) {
            return obj;
          }
        }
      }
    });
    this.toUpdateCheckboxSpan(data);
    this.toUpdateCheckboxSpan(data);
    if (brandArray.length > 0) {
      this.routerParams = {...this.routerParams, brand: brandArray.join('↕') }
      console.log(this.routerParams);
    }
    if (categoryArray.length > 0) {
      this.routerParams = {...this.routerParams, category: categoryArray.join('↕') }
      console.log(this.routerParams);
    }
    this.urlParams = new URLSearchParams(this.routerParams);
    this.url.search = this.urlParams.toString();
    history.pushState('', '', this.url.search);
    filterState.setFilter(data);
    this.cards.drawProducts(data);
  }

  toUpdateCheckboxSpan(data: Array<ProductType>) {
    this.filterContainer.querySelectorAll('.checkbox-line').forEach((el) => {
      (el.lastElementChild as HTMLSpanElement).innerHTML = '';
      (el.lastElementChild as HTMLSpanElement).textContent = `(${this.filter.checkbox.countOfProductsAll(
        data,
        (el.firstChild as HTMLInputElement).id.slice(0, -1),
        el.parentNode as HTMLElement
      )}/${this.filter.checkbox.countOfProductsAll(
        filterState.state,
        (el.firstChild as HTMLInputElement).id.slice(0, -1),
        el.parentNode as HTMLElement
      )})`;
    });
  }

  addRangeFilter(arr: Array<ProductType>, e: Event, i: number) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    console.log(target);
    let typeOfRange: string | undefined = target.parentElement?.classList[1].split('-')[0];
    let a = target.classList.toString() === 'slider-1' ?
      [target.value, (target.nextElementSibling as HTMLInputElement).value]
      : [(target.previousElementSibling as HTMLInputElement).value, target.value];

    console.log(typeOfRange);
    if (typeOfRange) {
      this.routerParams = {...this.routerParams, [typeOfRange]: a.join('↕')};
    }
    console.log(this.routerParams);
    this.urlParams = new URLSearchParams(this.routerParams);
    this.url.search = this.urlParams.toString();
    history.pushState('', '', this.url.search);
    const data = arr;
    this.cards.drawProducts(data);
    this.toUpdateCheckboxSpan(data);
    this.toUpdateCheckboxSpan(data);
  }

  render() {
    this.container.append(this.filterContainer);
    this.filterContainer.append(this.filter.init());
    this.container.append(this.getSection('cards__section'));
    this.controller.getSources((data) => {
      if (data) {
        filterState.setState(data);
        filterState.setFilter(data);
        data.forEach((t) => {
          filterState.setCategory(t.category);
          filterState.setBrand(t.brand);
          filterState.setPrice(t.price);
          filterState.setStock(t.stock);
        });
        this.filter.checkbox.getCheckboxes(
          this.filter.categoryFilterList.lastElementChild as HTMLElement,
          filterState.categories,
          'category__checkbox_span'
        );
        this.filter.checkbox.getCheckboxes(
          this.filter.brandFilterList.lastElementChild as HTMLElement,
          filterState.brands,
          'brand__checkbox_span'
        );
        this.filter.range.getDoubleRange(
          'price-container',
          this.filter.priceFilterList.lastElementChild as HTMLElement,
          filterState.price[0].toString(),
          filterState.price[filterState.price.length - 1].toString(),
          filterState.price[0].toString(),
          filterState.price[filterState.price.length - 1].toString()
        );
        this.filter.range.getDoubleRange(
          'stock-container',
          this.filter.stockFilterList.lastElementChild as HTMLElement,
          filterState.stock[0].toString(),
          filterState.stock[filterState.stock.length - 1].toString(),
          filterState.stock[0].toString(),
          filterState.stock[filterState.stock.length - 1].toString()
        );
        this.cards.drawProducts(data);
        this.addEventListener();
      }
    });
    const inputSearch = document.querySelector('input') as HTMLElement;
    inputSearch.addEventListener('input', (e) => this.inputEvent(e));
    return this.container;
  }
}

export default MainPage;
