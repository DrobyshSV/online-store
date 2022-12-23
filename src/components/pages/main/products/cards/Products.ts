import './Product.scss';
import { ProductType } from '../controller/controller';

class Products {
  draw(data: Array<ProductType>) {
    (document.querySelector('#main-page') as HTMLElement).innerHTML = '';
    const fragment = document.createDocumentFragment();
    data.forEach((item, index: number) => {
      const productCard: HTMLElement = document.createElement('div');
      productCard.classList.add('product');
      productCard.setAttribute('key', item.id.toString());
      const productName: HTMLElement = document.createElement('div');
      productName.innerHTML = `<span>${item.title}</span>`;
      const productImg: HTMLImageElement = document.createElement('img');
      productImg.setAttribute('width', '150px');
      productImg.src = item.images[0];
      const productBrand: HTMLElement = document.createElement('span');
      productBrand.innerText = item.brand;
      const productInStock: HTMLElement = document.createElement('span');
      productInStock.innerText = item.stock.toString();
      const productDiscont: HTMLElement = document.createElement('span');
      productDiscont.innerText = item.discountPercentage.toString();
      const productPriceWrapper: HTMLElement = document.createElement('div');
      const productPriceTitle: HTMLElement = document.createElement('h3');
      productPriceTitle.innerText = item.price.toString() + '$';
      const productAddBtn: HTMLElement = document.createElement('button');
      productAddBtn.textContent = 'ADD';
      productCard.append(productName, productImg, productBrand, productInStock, productDiscont, productPriceWrapper);
      productPriceWrapper.append(productPriceTitle, productAddBtn);
      fragment.append(productCard);
    });
    (document.querySelector('#main-page') as HTMLElement).append(fragment);
  }
}

export default Products;
