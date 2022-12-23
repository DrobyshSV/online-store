import { ISources } from '../controller/controller';
import Products from './Products';

class Cards {
  private products: Products;

  constructor() {
    this.products = new Products();
  }

  drawProducts(data: ISources | undefined) {
    const sectionCards = document.createElement('section');
    sectionCards.classList.add('cards__section');
    (document.querySelector('#main-page') as HTMLElement).append(sectionCards);
    if (data) {
      const products = data.products;
      this.products.draw(products);
    }
  }
}

export default Cards;
