import './basket.css'
import ProductPage from '../pages/product/ProductPage';

class Basket extends ProductPage{
   async getFetch(dataUrl: string){
    return fetch(dataUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  }
  
   async basketStructure(){
      const dataUrl = 'https://dummyjson.com/products/' + '34';
      let productInfo = await this.getFetch(dataUrl);
      const productTitle = productInfo.title;
      const productDescription = productInfo.description;
      const productCategory = productInfo.category;
      const productBrand = productInfo.brand;
      const productDiscount = productInfo.discountPercentage;
      const productImages = productInfo.images;
      const productPrice = productInfo.price;
      const productRating = productInfo.rating;
      const productStock = productInfo.stock;
      console.log(productTitle);
      const structure = `
         <div class="basket__container">
            <div class="basket__product-wrapper">
                <div class="basket__product-header">
                  <p>Products In Cart</p>
                  <p>ITEMS:</p>
                  <p>Num</p>
                  <p>PAGE:</p>
                  <div class="basket__pagination">
                     <button type="button" class="basket__pagination-left"><</button>
                     <p>Num</p>
                     <button type="button" class="basket__pagination-right">></button>
                  </div>
                </div>
                <div class="basket__product-body">
                  <div class="basket__product-img">
                     <p>Num</p>
                     <img src="${productImages[1]}" alt="альтернативный текст">
                  </div>
                  <div class="basket__product-info">
                     <p>${productTitle}</p>
                     <p>${productDescription}</p>
                     <div class="basket__product-rating">
                        <p>${productRating}</p>
                        <p>${productDiscount}</p>
                     </div>
                  </div>
                  <div class="basket__product-count">
                     <p>Stock: ${productStock}</p>
                     <div class="basket__product-buttons">
                        <button type="button" class="basket_button-plus">+</button>
                        <div class="basket__product-amount"></div>
                        <button type="button" class="basket_button-minus">-</button>
                     </div>
                     <p class="basket__product-price"></p>
                  </div>
                </div>
            </div>
            <div class="basket__info-wrapper">
               <p>Summary</p>
               <p class="basket__info-prod">Products:</p>
               <p class="basket__info-total">Total:</p>
               <form class="basket__form" action="" novalidate>
                  <input type="text" class="basket__info-input" name="promo" placeholder="Enter a promocode"></input>
                  <p>Promo for test: 'RS', 'EPM'</p>
                  <button type="submit">Submit</button>
               </form>
            </div>
         </div>
      `;
      this.container.innerHTML = structure;
   }
   async getBasketInfo(){
      await this.basketStructure();
      const dataUrl = 'https://dummyjson.com/products/' + '34';
      let productInfo = await this.getFetch(dataUrl);
      let amount: number = 0;

      const productPrice = productInfo.price;
      const buttonPlus = document.querySelector('.basket_button-plus') as HTMLElement;
      const buttonMinus = document.querySelector('.basket_button-minus') as HTMLElement;
      const productAmount = document.querySelector('.basket__product-amount') as HTMLElement;
      const basketProductPrice = document.querySelector('.basket__product-price') as HTMLElement;
      const basketInfoProd = document.querySelector('.basket__info-prod') as HTMLElement;
      const basketInfoTotal = document.querySelector('.basket__info-total') as HTMLElement;

      buttonPlus.addEventListener('click', () => {
       amount++
       productAmount.innerHTML = amount.toString();
       basketProductPrice.innerHTML = (amount*productPrice + '$').toString();
       basketInfoProd.innerHTML = 'Products:' + amount.toString();
       basketInfoTotal.innerHTML = ('Total:' + amount*productPrice + '$').toString();
      })
      buttonMinus.addEventListener('click', () => {
       amount--
       basketProductPrice.innerHTML = (amount*productPrice + '$').toString()
       basketInfoProd.innerHTML = 'Products:' + amount.toString();
       basketInfoTotal.innerHTML = ('Total:' + amount*productPrice + '$').toString();
       if(amount <= 0) {
         basketProductPrice.innerHTML = '0$'
         basketInfoProd.innerHTML = 'Products: 0'
         basketInfoTotal.innerHTML = 'Total: 0$'
         productAmount.innerHTML = '0';
         return amount=0;
       }
       productAmount.innerHTML = amount.toString()
       return amount
      })
      return amount
   }
   async formValidation(){
      await this.basketStructure();
      const mainForm = document.querySelector('.basket__form') as HTMLElement;
      const formInput = document.querySelector('.basket__info-input') as HTMLInputElement;
      const dataUrl = 'https://dummyjson.com/products/' + '34';
      let productInfo = await this.getFetch(dataUrl);
   
      mainForm.onsubmit = (e) => {
         let promoVal: string = formInput.value
         const isValidPromo = (promo: string) => {
         let res = /RS|EPM/gi;
         return res.test(String(promo).toLowerCase());
         }
         if(!isValidPromo(promoVal)){
            console.log('Please enter a valid promo');
            return false;
         }else{
            const productPrice = productInfo.price;
            const oldValue = document.querySelector('.basket__info-total') as HTMLElement;
            const oldPrice = document.querySelector('.basket__product-price') as HTMLElement;
            const amount = document.querySelector('.basket__product-amount') as HTMLElement;
            const amountNum = Number(amount.textContent)
            oldValue.innerHTML = ('Total:' + (productPrice*amountNum)/2 + '$').toString();
            oldPrice.innerHTML = ((productPrice*amountNum)/2 + '$').toString();
         }
         e.preventDefault()
      }
      
   }
   
   
 render() {
   this.basketStructure();
   this.getBasketInfo();
   this.formValidation();  
    return this.container;
  }
}
export default Basket;