import Products from './Products';
import { ProductType } from '../../../../types/types';

class Cards {
  private products: Products;

  constructor() {
    this.products = new Products();
  }

  drawProducts(data: Array<ProductType>) {
    if (data) {
      this.products.draw(data);
    }
  }
}

export default Cards;
