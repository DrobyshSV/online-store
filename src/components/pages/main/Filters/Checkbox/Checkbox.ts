import CreateHtml from '../CreateHtml';

class Checkbox extends CreateHtml {
  getCheckbox(el: HTMLElement, str: string) {
    const div = this.createElement('div', 'checkbox-line');
    const input = this.createElement('input', 'checkbox__input');
    input.setAttribute('type', 'checkbox');
    input.id = str + '/';
    const label = this.createElement('label', 'checkbox__label');
    label.setAttribute('for', str);
    label.textContent = str;
    const span = this.createElement('span', 'filter-count');
    span.textContent = '(0/5)';
    el.append(input, label, span);
    el.append(div);
  }

  getCheckboxes(node: HTMLElement, array: Array<string>) {
    const divFilterList = this.createElement('form', 'filter-list');
    node.append(divFilterList);
    array.forEach((el) => {
      this.getCheckbox(divFilterList, el);
    });
  }
}

export default Checkbox;
