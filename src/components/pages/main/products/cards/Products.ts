import './Product.scss';
import { ProductType } from '../../../../types/types';

class Products {
  draw(data: Array<ProductType>) {
    const productItems =  (document.querySelector('.product-items') as HTMLElement)
    productItems.innerHTML = '';
    data.forEach((item, index: number) => {
      const productCard: HTMLElement = document.createElement('div');
      productCard.classList.add('product');
      productCard.setAttribute('key', item.id.toString());
      const productName: HTMLElement = document.createElement('div');
      productName.innerHTML = `<span>${item.title}</span>`;
      const productImg: HTMLImageElement = document.createElement('img');
      productImg.setAttribute('width', '150px');
      productImg.setAttribute('height', '150px');
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
      productItems.append(productCard);
    });
  }
}

export default Products;
