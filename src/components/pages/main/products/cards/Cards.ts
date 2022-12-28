import {ISources, ProductType} from '../controller/controller';
import Products from './Products';

class Cards {
  private products: Products;

  constructor() {
    this.products = new Products();
  }

  drawProducts(data: Array<ProductType>) {
    if (data.length !== 0) {
      this.products.draw(data);
    }
  }
}

export default Cards;
