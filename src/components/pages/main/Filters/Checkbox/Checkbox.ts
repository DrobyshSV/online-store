import CreateHtml from '../CreateHtml';
import {ProductType} from '../../../../types/types';
import {filterState} from '../../MainPage';

class Checkbox extends CreateHtml {
  getCheckbox(el: HTMLElement, str: string, index: string, type: string, checked = false) {
    const div = this.createElement('div', 'checkbox-line');
    div.id = index;
    const input = this.createElement('input', 'checkbox__input') as HTMLInputElement;
    input.setAttribute('type', 'checkbox');
    input.checked = checked;
    input.id = str + '/';
    const label = this.createElement('label', 'checkbox__label');
    label.setAttribute('for', str);
    label.textContent = str;
    const span = this.createElement('span', 'filter-count');
    span.classList.add(type);
    span.textContent = `(${this.countOfProductsAll(filterState.state, str, el)}/${this.countOfProductsAll(
      filterState.state,
      str,
      el
    )})`;
    div.append(input, label, span);
    el.append(div);
  }

  countOfProductsAll(data: Array<ProductType>, el: string, node: HTMLElement) {
    let count = 0;
    if ((node.parentNode as HTMLElement).classList.contains('category')) {
      data.forEach((t) => (t.category.toLowerCase() === el.toLowerCase() ? (count += 1) : (count += 0)));
    } else {
      data.forEach((t) => (t.brand.toLowerCase() === el.toLowerCase() ? (count += 1) : (count += 0)));
    }
    return count;
  }

  getCheckboxes(node: HTMLElement, array: Array<string>, type: string) {
    array.forEach((el, index) => {
      this.getCheckbox(node, el, (index + 1).toString(), type);
    });
  }
}

export default Checkbox;
