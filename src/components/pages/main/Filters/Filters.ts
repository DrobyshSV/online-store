import './Filters.scss';
import './RangeSlider.scss';
import Checkbox from './Checkbox/Checkbox';
import RangeSlider from './Range/RangeSlider';
import CreateHtml from './CreateHtml';
import {ProductType} from '../../../types/types';

class Filters {
  private container: DocumentFragment;
  public range: RangeSlider;
  public checkbox: Checkbox;
  public categoryFilterList: HTMLElement;
  public brandFilterList: HTMLElement;
  public priceFilterList: HTMLElement;
  public stockFilterList: HTMLElement;
  private creator: CreateHtml;

  constructor() {
    this.creator = new CreateHtml();
    this.container = this.init();
    this.checkbox = new Checkbox();
    this.range = new RangeSlider();
    this.categoryFilterList = this.addFilterDiv('category', 'filter-list__checkbox');
    this.brandFilterList = this.addFilterDiv('brand', 'filter-list__checkbox');
    this.priceFilterList = this.addFilterDiv('price', 'filter-list__range');
    this.stockFilterList = this.addFilterDiv('stock', 'filter-list__range');
  }

  addFilterDiv(title: string, type: string) {
    const div = this.creator.createElement('div', title);
    const h3 = this.creator.createElement('h3', 'title-filter');
    h3.textContent = title;
    div.append(h3, this.addFilterList(type));
    return div;
  }

  addFilterList(type: string) {
    const div = this.creator.createElement('form', type);
    return div;
  }

  init() {
    const fragment = document.createDocumentFragment();
    fragment.append(this.categoryFilterList, this.brandFilterList, this.priceFilterList, this.stockFilterList);
    return fragment;
  }
}

export default Filters;
