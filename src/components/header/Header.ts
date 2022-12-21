import './header.scss';
import Component from '../common/Component';

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderLogo() {
    const title = document.createElement('h1');
    title.classList.add('title');
    title.innerText = 'Online-store';
    this.container.append(title);
  }

  renderSearchForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Search');
    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    form.append(input, button);
    this.container.append(form);
  }

  renderBasket() {
    const basket = document.createElement('div');
    basket.classList.add('basket');
    const count = document.createElement('span');
    count.innerText = '0';
    basket.append(count);
    this.container.append(basket);
  }

  render() {
    this.renderLogo();
    this.renderSearchForm();
    this.renderBasket();
    return this.container;
  }
}

export default Header;
