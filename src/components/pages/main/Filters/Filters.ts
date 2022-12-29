import './Filters.scss';
import './RangeSlider.scss';

class Filters {
  private container: HTMLDivElement;

  constructor() {
    this.container = this.init();
  }

  createElement(tag: string, className: string) {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
  }

  getCheckbox(index: number, array: Array<string>) {
    const form = document.querySelectorAll('form').item(index);
    form.innerHTML = '';
    array.forEach((el) => {
      const div = document.createElement('div');
      div.classList.add('checkbox-line');
      const input = document.createElement('input');
      input.classList.add('checkbox__input');
      input.setAttribute('type', 'checkbox');
      input.id = el + '/';
      const label = document.createElement('label');
      label.classList.add('checkbox__label');
      label.setAttribute('for', el);
      label.textContent = el;
      const span = document.createElement('span');
      span.textContent = '(5/5)';
      form.append(input, label, span);
      form.append(div);
    });
    return form;
  }

  getDoubleRange() {

    const divWrapper = this.createElement('div', 'wrapper');
    const values = this.createElement('div', 'values');
    const range1 = this.createElement('span', 'range1');
    range1.textContent = '$' + '0';
    const dash = this.createElement('span', 'dash');
    dash.textContent = '-';
    const range2 = this.createElement('span', 'range2');
    range2.textContent = '$' + '100';
    values.append(range1, dash, range2);
    const divContainer = this.createElement('div', 'container');
    const divSliderTrack = this.createElement('div', 'slider-track');
    const inputSlider1 = this.createElement('input', 'slider-1') as HTMLInputElement;
    inputSlider1.setAttribute('type', 'range');
    inputSlider1.setAttribute('min', '0');
    inputSlider1.setAttribute('max', '100');
    inputSlider1.setAttribute('value', '0');
    inputSlider1.addEventListener('input', () => {
    });
    const inputSlider2 = this.createElement('input', 'slider-2') as HTMLInputElement;
    inputSlider2.setAttribute('type', 'range');
    inputSlider2.setAttribute('min', '0');
    inputSlider2.setAttribute('max', '100');
    inputSlider2.setAttribute('value', '100');
    inputSlider2.addEventListener('input', () => {
    });
    divContainer.append(divSliderTrack, inputSlider1, inputSlider2);
    divWrapper.append(values, divContainer);

    return divWrapper;
  }

  addFilterDiv(type: string) {
    let divFilterList;
    const div = document.createElement('div');
    div.classList.add(type);
    const h3 = document.createElement('h3');
    h3.textContent = type;
    div.append(h3);
    if (type === 'price' || type === 'stock') {
      return div;
    } else {
      divFilterList = document.createElement('form');
      divFilterList.classList.add('filter-list');
      div.append(divFilterList);
      return div;
    }
  }

  init() {
    const div = document.createElement('div');
    const categoryFilterList = this.addFilterDiv('category');
    const brandFilterList = this.addFilterDiv('brand');
    const priceFilterList = this.addFilterDiv('price');
    const range1 = this.getDoubleRange();
    priceFilterList.append(range1);
    const stockFilterList = this.addFilterDiv('stock');
    const range2 = this.getDoubleRange();
    stockFilterList.append(range2);
    div.append(categoryFilterList, brandFilterList);
    div.append(priceFilterList, stockFilterList);
    return div;
  }
}

export default Filters;
