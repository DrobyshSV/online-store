import { ProductType } from '../../../../types';
import CardsHeader from '../cardsHeader/cardsHeader';

import Products from './Products';

import './Cards.scss';

class Cards {
  private products: Products;
  public cardsHeader: CardsHeader;

  constructor() {
    this.products = new Products();
    this.cardsHeader = new CardsHeader();
  }

  drawProducts(data: Array<ProductType>, viewMode: string) {
    if (data) {
      this.products.draw(data, viewMode);
    }
  }
}

export default Cards;
