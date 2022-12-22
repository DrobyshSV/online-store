import Page from '../../common/Page';
import './product.css'

class ProductPage extends Page {
  static TextObject = {
    MainTitle: 'Settings Page',
  };

  constructor(id: string) {
    super(id);
  }

  createProductContainer(phoneName: string, phoneImg: string, phoneDescription:string){
    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');
    const stucture = `
      <div class = "product__name">${phoneName}</div>
      <div class = "product__"img><img src="${phoneImg}" alt="test"></img></div>
      <div class = "product__description">${phoneDescription}</div>
      <div class = "product__other">o o o</div>
   `;
    productContainer.innerHTML = stucture;
    return productContainer;
  }

  render() {
    const prod = this.createProductContainer('Iphone', 'undefined', 'test');
    this.container.append(prod)
    return this.container;
  }
}

export default ProductPage;
