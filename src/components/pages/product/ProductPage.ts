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
    this.container.append(productContainer);
    const stucture = `
      <div class = "product__wrap">
        <div class = "product__source">
          <div class = "product__name">${phoneName}</div>
          <div class = "product__name">${phoneName}</div>
          <div class = "product__name">${phoneName}</div>
          <div class = "product__name">${phoneName}</div>
        </div>
        <div class = "product__name">${phoneName}</div>
        <div class = "product__main">
          <div class = "product__galery">
            <div class = "product__image"><img src="#" alt="product"></img></div>
            <div class = "product__image"><img src="#" alt="product"></img></div>
            <div class = "product__image"><img src="#" alt="product"></img></div>
          </div>
          <div class = "product__img"><img src="#" alt="product"></img></div>
          <div class = "product__description">
            <div class = "product__description item"></div>
            <div class = "product__description item"></div>
            <div class = "product__description item"></div>
            <div class = "product__description item"></div>
            <div class = "product__description item"></div>
            <div class = "product__description item"></div>
          </div>
          <div class = "product__price">
            <div class = "product__price item"></div>
            <div class = "product__price item"></div>
            <div class = "product__price item"></div>
          </div>
        </div>
      </div>
   `;
    productContainer.innerHTML = stucture;
    return productContainer;
  }

  render() {
    const prod = this.createProductContainer('Iphone', 'undefined', 'test');
    return this.container;
  }
}

export default ProductPage;
