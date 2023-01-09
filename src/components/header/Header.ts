import './header.scss';
import Component from '../common/Component';

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderLogo() {
    const title = document.createElement('a');
    title.classList.add('title');
    title.innerText = 'Online-store';
    this.container.append(title);
  }

  renderSearchForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.classList.add('search__input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Search');
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    form.append(input, button);
    this.container.append(form);
    input.addEventListener('keypress', (e) => {
      console.log(e);
    });
  }

  renderBasket() {
    const basket = document.createElement('a');
    basket.classList.add('basket');
    basket.href = '#basket-page';
    const basketLogo = document.createElement('div');
    basketLogo.classList.add('basket-logo');
    const countWrapper = document.createElement('div');
    basketLogo.classList.add('count-wrapper');
    const countItem = document.createElement('p');
    countItem.innerHTML = `Count: <span class='basket-item-count'>0</span>`;
    const countPrice = document.createElement('p');
    countPrice.innerHTML = `Total: <span class='basket-item-count'>0</span> €`;
    basket.append(basketLogo, countWrapper);
    countWrapper.append(countItem,countPrice)
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
