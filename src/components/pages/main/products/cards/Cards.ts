import { ISources } from '../controller/controller';
import Products from './Products';
import Filters from '../../Filters/Filters';

class Cards {
  private products: Products;
  private filters: Filters;

  constructor() {
    this.products = new Products();
    this.filters = new Filters();
  }

  drawProducts(data: ISources | undefined) {
    if (data) {
      const products = data.products;
      this.products.draw(products);
    }
  }
}

export default Cards;
