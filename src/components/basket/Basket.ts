import './basket.css'
import ProductPage from '../pages/product/ProductPage';

class Basket extends ProductPage{

   async basket(){
      const getProductPageInfo = this.createProductContainer('34');
      const productDescription = (await getProductPageInfo).querySelector('.product__description') as HTMLElement;
      productDescription.addEventListener('click', () => {
         console.log('Testing');
    });
    this.container.append(productDescription);
}

   async innerInfo(){
      const max = await this.createProductContainer('34');
      const productPrice = max.querySelector('.product__price') as HTMLElement;
      const fest = document.createElement('p')
      fest.innerHTML = 'This is a test';
      productPrice.append(fest)
      this.container.append(productPrice);
      console.log(productPrice)
   }
 render() {
    this.basket();
    return this.container;
  }
}
export default Basket;