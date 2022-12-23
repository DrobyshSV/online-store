import Page from '../../common/Page';
import './product.css'

class ProductPage extends Page {
  static TextObject = {
    MainTitle: 'Settings Page',
  };

  constructor(id: string) {
    super(id);
  }

  async getFetch(dataUrl: string){
    return fetch(dataUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  }
  
  async createProductContainer(productId: string){
    const dataUrl = 'https://dummyjson.com/products/' + productId;
    let productInfo = await this.getFetch(dataUrl);
    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');

    const productTitle = productInfo.title;
    const productDescription = productInfo.description;
    const productCategory = productInfo.category;
    const productBrand = productInfo.brand;
    const productDiscount = productInfo.discountPercentage;
    const productImages = productInfo.images;
    const productPrice = productInfo.price;
    const productRating = productInfo.rating;
    const productStock = productInfo.stock;

    const stucture = `
      <div class = "product__wrap">
        <div class = "product__source">
          <div class = "product__source source_item"><p>Store<span>/</span></p></div>
          <div class = "product__source source_item">${productCategory}<span>/</span></div>
          <div class = "product__source source_item">${productBrand}<span>/</span></div>
          <div class = "product__source source_item">${productTitle}<span>/</span></div>
        </div>
        <div class = "product__main">
          <div class = "product__galery">
            <div class = "product__image"><img src="${productImages[1]}" alt="product"></img></div>
            <div class = "product__image"><img src="${productImages[2]}" alt="product"></img></div>
            <div class = "product__image"><img src="${productImages[3]}" alt="product"></img></div>
          </div>
          
          <div class = "product__image main_img"><img src="${productImages[4]}" alt="product"></img></div>
          
          <div class = "product__description">
            <div class = "product__name">${productTitle}</div>
            
            <div class = "product__price">
              <div class = "product__price elem">${productPrice}$</div>
              <div class = "product__price elem"><p>add to card</p></div>
              <div class = "product__price elem"><p>buy now</p></div>
            </div>

            <div class = "product__description item"><span class = "pre__description">Brand:</span> ${productBrand}</div>
            <div class = "product__description item"><span class = "pre__description">Category:</span> ${productCategory}</div>
            <div class = "product__description item"><span class = "pre__description">In stock:</span> ${productStock}</div>
            <div class = "product__description item"><span class = "pre__description">Description:</span> ${productDescription}</div>
            <div class = "product__description item"><span class = "pre__description">Discount:</span> ${productDiscount}</div>
            <div class = "product__description item"><span class = "pre__description">Rating:</span> ${productRating}</div>
          </div>
        </div>
      </div>
   `;

    productContainer.innerHTML = stucture;
    return productContainer;
  }

  render() {
    this.createProductContainer('12').then((productContainer) => {
      this.container.append(productContainer);
    })
    return this.container;
  }
}

export default ProductPage;
