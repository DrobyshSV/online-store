import './Product.scss';
import {ProductType} from '../../../../types/types';
import CreateHtml from '../../Filters/CreateHtml';

class Products extends CreateHtml {
  constructor() {
    super();
  }

  draw(data: Array<ProductType>, viewMode: string) {
    const productItems = document.querySelector('.product-items') as HTMLElement;
    if (productItems.classList.contains('items-list')) {
      productItems.classList.remove('items-list')
    } else if (productItems.classList.contains('items-cards')) {
      productItems.classList.remove('items-cards')
    }
    productItems.classList.add(`items-${viewMode}`);
    productItems.innerHTML = '';

    data.forEach((item, index: number) => {
      const productCard = this.createElement('div', `product-${viewMode}`);
      productCard.setAttribute('key', item.id.toString());
      const productTitle = this.createElement('h3', 'product-title');
      productTitle.innerText = item.title;
      const productImg = this.createElement('img', 'card__img') as HTMLImageElement;
      productImg.setAttribute('width', '150px');
      productImg.setAttribute('height', '150px');
      productImg.src = item.images[0];
      const productCategory = this.createElement('h4', 'product-description');
      productCategory.innerHTML = `Category: <span>${item.category}</span>`;
      const productBrand = this.createElement('h4', 'product-description');
      productBrand.innerHTML = `Brand: <span>${item.brand}</span>`;
      const productInStock = this.createElement('h4', 'product-description');
      productInStock.innerHTML = `Stock: <span>${item.stock.toString()}</span>`;
      const productDiscont = this.createElement('h4', 'product-description');
      productDiscont.innerHTML = `Discount: <span>${item.discountPercentage.toString()}</span>`;
      const productPrice = this.createElement('h4', 'product-description');
      productPrice.innerHTML = `Price: <span>${item.price.toString()}$</span>`;
      const productButtonsWrapper = this.createElement('div', 'btn-wrapper');
      const productAddBtn = this.createElement('button', 'add__btn');
      productAddBtn.textContent = 'ADD';
      productAddBtn.setAttribute('type', 'button');
      const productDetailsLink = this.createElement('a', 'details__link') as HTMLLinkElement;
      productDetailsLink.href = `#product-page/${item.id}`;
      const productDetails = this.createElement('button', 'details__btn');
      productDetails.textContent = 'Details';
      productDetails.setAttribute('type', 'button');
      productButtonsWrapper.append(productAddBtn, productDetailsLink);
      productDetailsLink.append(productDetails);
      if (viewMode === 'cards') {
        productCard.append(
          productTitle,
          productImg,
          productCategory,
          productBrand,
          productInStock,
          productDiscont,
          productPrice,
          productButtonsWrapper
        );

      } else if (viewMode === 'list') {

        const listImgWrapper = this.createElement('div', 'list-wrapper__img');
        const listInfoWrapper = this.createElement('h4', 'list-info');
        const productDescription = this.createElement('p', 'product-description');
        const productRating = this.createElement('h4', 'product-description');
        productRating.innerHTML = `Rating: <span>${item.rating.toString()}</span>`;
        productBrand.innerText = `Description: ${item.description}`;
        productCard.append(listImgWrapper, listInfoWrapper, productButtonsWrapper);
        listImgWrapper.append(productImg);
        listInfoWrapper.append(productTitle, productDescription, productBrand, productPrice, productRating);
      }
      productItems.append(productCard);
    });

  }
}

export default Products;
