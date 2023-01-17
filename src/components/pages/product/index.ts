import Page from '../../common/Page';

import './product.css';

class ProductPage extends Page {
  private id: string | undefined;

  constructor(id: string) {
    super(id);
    this.id = id;
  }

  async getFetch(dataUrl: string) {
    return fetch(dataUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  }

  async createProductContainer() {
    const id = this.id?.split('/')[1];
    const dataUrl = 'https://dummyjson.com/products/' + id;
    const productInfo = await this.getFetch(dataUrl);
    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');

    const {title, description, category, brand, discount, images, price, rating, stock} = productInfo;
    // CODE STRUCTURE
    const structure = `
      <div class = 'product__wrap'>
        <div class = 'product__source'>
          <div class = 'product__source source_item'><a href='#main-page'>Store<span>/</span></a></div>
          <div class = 'product__source source_item'>${category}<span>/</span></div>
          <div class = 'product__source source_item'>${brand}<span>/</span></div>
          <div class = 'product__source source_item'>${title}<span>/</span></div>
        </div>
        <div class = 'product__main'>
          <div class = 'product__galery'>
          </div>   
          <div class = 'product__image main_img'><img src='${images[0]}' alt='product'></img></div>   
          <div class = 'product__description'>
            <div class = 'product__name'>${title}</div>          
            <div class = 'product__price'>
              <div class = 'product__price elem'>${price}$</div>
              <div class = 'product__price elem' onclick="function popUpPay(){
                const popupPay = document.querySelector('.popup__pay');
                const paument = document.querySelector('#payment');
                paument.classList.add('open');
                popupPay.classList.add('open');
              }
            popUpPay()"><a>buy now</a></div>
              <div class = 'product__price elem'><p> add to cart</p></div>
            </div>
            <div class = 'product__description item'><span class = 'pre__description'>Brand:</span> ${brand}</div>
            <div class = 'product__description item'><span class = 'pre__description'>Category:</span> ${category}</div>
            <div class = 'product__description item'><span class = 'pre__description'>In stock:</span> ${stock}</div>
            <div class = 'product__description item'><span class = 'pre__description'>Description:</span> ${description}</div>
            <div class = 'product__description item'><span class = 'pre__description'>Discount:</span> ${discount}</div>
            <div class = 'product__description item'><span class = 'pre__description'>Rating:</span> ${rating}</div>
          </div>
        </div>
      </div>
      <div class = 'popup'>
        <div class = 'popup__body'>
          <div class = 'popup__content'>
              <p class = 'popup__close'>X</p>
              <img src='' class = 'popup__img' alt='product'></img>
          </div>
        </div>
      </div>
   `;

    productContainer.innerHTML = structure;
    return productContainer;
  }

  async setDivs() {
    this.createProductContainer();
    const productId = this.id?.split('/')[1];
    const dataUrl = 'https://dummyjson.com/products/' + productId
    const productInfo = await this.getFetch(dataUrl);
    const productGalery = document.querySelector('.product__galery') as HTMLElement;
    const productImages = productInfo.images;
    for (const item of productImages) {
      const productImageWrap = document.createElement('div');
      const productImageImg = document.createElement('img');
      productImageImg.src = item;
      productImageWrap.classList.add('product__image');
      productImageWrap.append(productImageImg);
      productGalery.append(productImageWrap);
    }
  }

  async setEvents() {
    await this.createProductContainer();
    const mainImage = document.querySelector('.main_img') as HTMLElement;
    mainImage.addEventListener('click', () => {
      const popUp = document.querySelector('.popup') as HTMLElement;
      const thisImage = document.querySelector('.main_img img') as HTMLImageElement;
      const newImg = document.querySelector('.popup__img') as HTMLImageElement;
       const popUpContent = document.querySelector('.popup__content') as HTMLElement;
      newImg.src = thisImage.src;
      popUp.classList.add('open');
      popUpContent.append(newImg);
    })

    const popupClose = document.querySelector('.popup__close') as HTMLElement;
    popupClose.addEventListener('click', (e) => {
      const popUp = document.querySelector('.popup') as HTMLElement;
      popUp.classList.remove('open');
      e.preventDefault();
    });

    const popupBody = document.querySelector('.popup__body') as HTMLElement;
    popupBody.addEventListener('click', (e) => {
      const popUp = document.querySelector('.popup') as HTMLElement;
      popUp.classList.remove('open');
      e.preventDefault();
    });

    const productImage = document.querySelectorAll('.product__image');
    productImage.forEach((element) => {
      element.addEventListener('click', () => {
        const thisImage = element.querySelector('img');
        const newSrc = (thisImage as HTMLImageElement).src;
        const newImg = document.querySelector('.main_img img') as HTMLImageElement;
        newImg.src = newSrc;
      });
    });
  }

  render() {
    this.createProductContainer()
      .then((productContainer) => {
        this.container.append(productContainer);
      })
      .then(() => {
        this.setDivs();
      })
      .then(() => {
        this.setEvents();
      });
    history.pushState('', '', window.location.origin + window.location.hash);
    return this.container;
  }
}

export default ProductPage;
