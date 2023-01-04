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

  addListener() {
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
        this.getDataForRangeListenerCallback(i);
        this.addRangeFilter(e, i, 'left');
      });
    });
    rangeInputs2.forEach((t, i) => {
      t.addEventListener('click', (e) => {
        this.getDataForRangeListenerCallback(i);
        this.addRangeFilter(e, i, 'right');
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
    filterState.setFilter(arr);
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
    this.filter.categoryFilterList.querySelectorAll('.checkbox-line').forEach((t) => {
      this.toUpdateCheckboxSpan(t, data);
    });
    this.filter.brandFilterList.querySelectorAll('.checkbox-line').forEach((t) => {
      this.toUpdateCheckboxSpan(t, data);
    });
    filterState.setFilter(data);
    console.log(data);
    this.cards.drawProducts(data);
  }

  toUpdateCheckboxSpan(t: Element, data: Array<ProductType>) {
    (t.lastElementChild as HTMLSpanElement).innerHTML = '';
    (t.lastElementChild as HTMLSpanElement).textContent = `(${this.filter.checkbox.countOfProductsAll(
      data,
      (t.firstChild as HTMLInputElement).id.slice(0, -1),
      t.parentNode as HTMLElement
    )}/${this.filter.checkbox.countOfProductsAll(
      filterState.state,
      (t.firstChild as HTMLInputElement).id.slice(0, -1),
      t.parentNode as HTMLElement
    )})`;
  }

  addRangeFilter(e: Event, i: number, range: string) {
    debugger
    const arr = filterState.filter;
    this.cards.drawProducts(arr);
    (this.filter.priceFilterList.lastElementChild as HTMLElement).innerHTML = '';
    (this.filter.stockFilterList.lastElementChild as HTMLElement).innerHTML = '';
    const target = e.target as HTMLInputElement;
    if (i === 0 && range === 'left') {
      this.filter.range.getDoubleRange(
        this.filter.priceFilterList.lastElementChild as HTMLElement,
        target.value,
        arr.sort((a, b) => a.price - b.price)[arr.length - 1].price.toString(),
        filterState.price[0].toString(),
        filterState.price[filterState.price.length - 1].toString()
      );
      this.filter.range.getDoubleRange(
        this.filter.stockFilterList.lastElementChild as HTMLElement,
        arr.sort((a, b) => a.stock - b.stock)[0].stock.toString(),
        arr[arr.length - 1].stock.toString(),
        filterState.stock[0].toString(),
        filterState.stock[filterState.stock.length - 1].toString()
      );
    }
    if (i === 1 && range === 'left') {
      this.filter.range.getDoubleRange(
        this.filter.priceFilterList.lastElementChild as HTMLElement,
        arr.sort((a, b) => a.price - b.price)[0].price.toString(),
        arr[arr.length - 1].price.toString(),
        filterState.price[0].toString(),
        filterState.price[filterState.price.length - 1].toString()
      );
      this.filter.range.getDoubleRange(
        this.filter.stockFilterList.lastElementChild as HTMLElement,
        target.value,
        arr.sort((a, b) => a.stock - b.stock)[arr.length - 1].stock.toString(),
        filterState.stock[0].toString(),
        filterState.stock[filterState.stock.length - 1].toString()
      );
    }
    if (i === 0 && range === 'right') {
      this.filter.range.getDoubleRange(
        this.filter.priceFilterList.lastElementChild as HTMLElement,
        arr.sort((a, b) => a.price - b.price)[0].price.toString(),
        target.value,
        filterState.price[0].toString(),
        filterState.price[filterState.price.length - 1].toString()
      );
      this.filter.range.getDoubleRange(
        this.filter.stockFilterList.lastElementChild as HTMLElement,
        arr.sort((a, b) => a.stock - b.stock)[0].stock.toString(),
        arr[arr.length - 1].stock.toString(),
        filterState.stock[0].toString(),
        filterState.stock[filterState.stock.length - 1].toString()
      );
    }
    if (i === 1 && range === 'right') {
      this.filter.range.getDoubleRange(
        this.filter.priceFilterList.lastElementChild as HTMLElement,
        arr.sort((a, b) => a.price - b.price)[0].price.toString(),
        arr[arr.length - 1].price.toString(),
        filterState.price[0].toString(),
        filterState.price[filterState.price.length - 1].toString()
      );
      this.filter.range.getDoubleRange(
        this.filter.stockFilterList.lastElementChild as HTMLElement,
        arr.sort((a, b) => a.stock - b.stock)[0].stock.toString(),
        target.value,
        filterState.stock[0].toString(),
        filterState.stock[filterState.stock.length - 1].toString()
      );
    }
    this.filter.categoryFilterList.querySelectorAll('.checkbox-line').forEach((t) => {
      this.toUpdateCheckboxSpan(t as HTMLSpanElement, arr);
    });
    this.filter.brandFilterList.querySelectorAll('.checkbox-line').forEach((t) => {
      this.toUpdateCheckboxSpan(t as HTMLSpanElement, arr);
    });
    this.addListener();
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
          this.filter.priceFilterList.lastElementChild as HTMLElement,
          filterState.price[0].toString(),
          filterState.price[filterState.price.length - 1].toString(),
          filterState.price[0].toString(),
          filterState.price[filterState.price.length - 1].toString()
        );
        this.filter.range.getDoubleRange(
          this.filter.stockFilterList.lastElementChild as HTMLElement,
          filterState.stock[0].toString(),
          filterState.stock[filterState.stock.length - 1].toString(),
          filterState.stock[0].toString(),
          filterState.stock[filterState.stock.length - 1].toString()
        );
        this.cards.drawProducts(data);
        this.addListener();
      }
    });
    const inputSearch = document.querySelector('input') as HTMLElement;
    inputSearch.addEventListener('input', (e) => this.inputEvent(e));
    return this.container;
  }
}

export default MainPage;
