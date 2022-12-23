import Page from '../../common/Page';
import './product.css'

class ProductPage extends Page {
  static TextObject = {
    MainTitle: 'Settings Page',
  };

  constructor(id: string) {
    super(id);
  }

  getFetch(dataUrl: string){
        let newObj;
        fetch(dataUrl)
        .then((response) => {
          return response.json();
        })  
        
  }

  createProductContainer(productId: string){
    const dataUrl = 'https://dummyjson.com/products/' + productId;
    const test = this.getFetch(dataUrl);
    console.log(test);
    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');
    const stucture = `
      <div class = "product__wrap">
        <div class = "product__source">
          <div class = "product__name"></div>
          <div class = "product__name"></div>
          <div class = "product__name"></div>
          <div class = "product__name"></div>
        </div>
        <div class = "product__name"></div>
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
    const prod = this.createProductContainer('1');
    this.container.append(prod)
    return this.container;
  }
}

export default ProductPage;
