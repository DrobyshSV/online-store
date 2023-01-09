import './basket.css'
import ProductPage from '../pages/product/ProductPage';
import MainPage from '../pages/main/MainPage';

class Basket extends ProductPage{
   rows: string;
   constructor(rows: string){
      super('idPage');
      this.rows = rows;
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
                  <button type="submit" class="info-btn">Submit</button>
               </form>
            </div>
         </div>
      `;
      this.container.innerHTML = structure;
   }
   
   async pagination(){
      await this.basketStructure();
      const ids = [4, 5, 6, 7, 8, 10,11];
      let currentPage = 1;
      let rows = 2;
      const prodPage = document.querySelector('#product-page') as HTMLElement;
      const header = `
            <div class="basket__product-header">
               <p>Products In Cart</p>
               <p>LIMIT:</p>
               <form class="basket__limit-form" action="" novalidate>
                  <input type="text" class="basket__limit-input" name="limit"></input>
               </form>
               <p>PAGE:</p>
               <div class="basket__pagination">
                  <button type="button" class="basket__pagination-left"><</button>
                  <p class="page-number">1</p>
                  <button type="button" class="basket__pagination-right">></button>
               </div>
            </div>`;
         const info = `
            <div class="basket__info-wrapper">
               <p>Summary</p>
               <p class="basket__info-prod">Products:</p>
               <p class="basket__info-total">Total:</p>
               <form class="basket__form" action="" novalidate>
                  <input type="text" class="basket__info-input" name="promo" placeholder="Enter a promocode"></input>
                  <p>Promo for test: 'RS', 'EPM'</p>
                  <button type="button">Submit</button>
               </form>
            </div>
         `;
      
         const headerInfoWrapper = document.createElement('div');
         const headerContent = document.createElement('div');
         const infoContent = document.createElement('div');
         infoContent.classList.add('form-wrap');
         headerInfoWrapper.classList.add('header_info-wrapper');
         headerContent.innerHTML = header;
         infoContent.innerHTML = info;
         headerInfoWrapper.append(headerContent, infoContent)
         prodPage.append(headerInfoWrapper)

      const displayList = (elem: number[],productsPerPage: string, page: number) => {
         let mainWrapper: HTMLElement;
         if(document.querySelector('.main-wrapper') as HTMLElement){
            mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
            mainWrapper.innerHTML = '';
         }else{
         mainWrapper = document.createElement('div') as HTMLElement;
         mainWrapper.classList.add('main-wrapper');
         prodPage.append(mainWrapper);
         }
         page--;
         const start = Number(productsPerPage) * page;
         const end = start + Number(productsPerPage);
         const paginatedData = elem.slice(start, end)

         paginatedData.forEach(async (el)=>{
            const dataUrl = 'https://dummyjson.com/products/' + el;
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
            const struc = `
               <div class="basket__product-wrapper">                  
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
            
            `
            const newCont = document.createElement('div')
            newCont.classList.add('basket__pag')
            mainWrapper.append(newCont)
            newCont.innerHTML = struc 
         })
      }
      const displayPagination  = () => {
         let count: number = 1;
         const header = document.querySelector('.header_info-wrapper') as HTMLElement;
         const basketPaginationLeft = header.querySelector('.basket__pagination-left') as HTMLElement;
         const basketPaginationRight = header.querySelector('.basket__pagination-right') as HTMLElement;
         const pageNumber = header.querySelector('.page-number') as HTMLElement;;
         basketPaginationRight.addEventListener('click', () => {
            count++
            currentPage = currentPage + 1;
            pageNumber.innerHTML = count.toString()
            displayList(ids,this.rows = '3',currentPage)
         })
         basketPaginationLeft.addEventListener('click', () => {
            if(count <= 0){
               return count=0
            }
            count--
            currentPage = currentPage - 1;
            pageNumber.innerHTML = count.toString()
            displayList(ids,this.rows = '3',currentPage)
         })
         
      }
      displayList(ids,'3',currentPage)
      displayPagination()
      
      const headerr = document.querySelector('.form-wrap') as HTMLElement;
      const mainForm = headerr.querySelector('.basket__form') as HTMLElement;
      const formInput = headerr.querySelector('.basket__info-input') as HTMLFormElement;
      const dataUrl = 'https://dummyjson.com/products/' + '34';
      let productInfo = await this.getFetch(dataUrl);
      mainForm.onsubmit =(el)=> {
         let promoVal: string = formInput.value

         const isValidPromo = (promo: string) => {
         let res = /RS|EPM/gi;
         return res.test(String(promo).toLowerCase());
         }
         if(!isValidPromo(promoVal)){
            console.log('Please enter a valid promo');
            const oldValue = headerr.querySelector('.basket__info-total') as HTMLElement;
            const amount = document.querySelector('.basket__product-amount') as HTMLElement;
            return false;
         }else{
            const productPrice = productInfo.price;
            const oldValue = headerr.querySelector('.basket__info-total') as HTMLElement;
            const oldPrice = headerr.querySelector('.basket__product-price') as HTMLElement;
            const amount = headerr.querySelector('.basket__product-amount') as HTMLElement;
            const amountNum = Number(amount.textContent)
            oldValue.innerHTML = ('Total:' + (productPrice*amountNum)/2 + '$').toString();
            oldPrice.innerHTML = ((productPrice*amountNum)/2 + '$').toString();
         }
          el.preventDefault();
      }
      return rows
   }
   async formValidation(){
      await this.pagination();
      const header = document.querySelector('.header_info-wrapper') as HTMLElement;
      const headerLimitForm = header.querySelector('.basket__limit-form') as HTMLElement;
      const headerLimitInput = header.querySelector('.basket__limit-input') as HTMLInputElement;
      console.log(headerLimitForm);
      console.log(headerLimitInput);
      headerLimitForm.onsubmit = (e) => {
         let limitVal : string = headerLimitInput.value;
         const isValidLimit = (limit: string) => {
            let res = /^[0-9]$/;
            return res.test(String(limit).toLowerCase());
         }
         if(!isValidLimit(limitVal)){
            console.log('Please enter a valid limit');
            return false;
         }else{
            this.rows = limitVal
            console.log(this.rows);
         }
         e.preventDefault();
      }

   
      // const header = document.querySelector('.form-wrap') as HTMLElement;
      // console.log(header)
      // const mainForm = header.querySelector('.basket__form') as HTMLElement;
      // mainForm.innerHTML = "HALOooooooooo"
      // const formInput = document.querySelector('.basket__info-input') as HTMLInputElement;
      // const dataUrl = 'https://dummyjson.com/products/' + '34';
      // let productInfo = await this.getFetch(dataUrl);
      // mainForm.onsubmit = (e) => {
      //    let promoVal: string = formInput.value
      //    const isValidPromo = (promo: string) => {
      //    let res = /RS|EPM/gi;
      //    return res.test(String(promo).toLowerCase());
      //    }
      //    if(!isValidPromo(promoVal)){
      //       console.log('Please enter a valid promo');
      //       return false;
      //    }else{
      //       const productPrice = productInfo.price;
      //       const oldValue = document.querySelector('.basket__info-total') as HTMLElement;
      //       const oldPrice = document.querySelector('.basket__product-price') as HTMLElement;
      //       const amount = document.querySelector('.basket__product-amount') as HTMLElement;
      //       const amountNum = Number(amount.textContent)
      //       oldValue.innerHTML = ('Total:' + (productPrice*amountNum)/2 + '$').toString();
      //       oldPrice.innerHTML = ((productPrice*amountNum)/2 + '$').toString();
      //    }
      //     e.preventDefault();
      // }
   }
   async getBasketInfo(){
      await this.pagination();
      const dataUrl = 'https://dummyjson.com/products/' + '34';
      let productInfo = await this.getFetch(dataUrl);
      let amount: number = 0;

      const header = document.querySelector('.header_info-wrapper') as HTMLElement;
      const mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
      const productPrice = productInfo.price;
      
      mainWrapper.addEventListener('click', (e) =>{
         const target = e.target as HTMLInputElement;
         const bag = mainWrapper.querySelectorAll('.basket__pag');

         bag.forEach(el => {
            el.addEventListener('click', (e) =>{
               console.log(el)
            })
               const productAmount = el.querySelector('.basket__product-amount') as HTMLElement;
               const basketProductPrice = el.querySelector('.basket__product-price') as HTMLElement;
               const basketInfoProd = header.querySelector('.basket__info-prod') as HTMLElement;
               const basketInfoTotal = header.querySelector('.basket__info-total') as HTMLElement;

               if(target.classList.contains('basket_button-plus')){
                  amount++
                  productAmount.innerHTML = amount.toString();
                 
                  basketProductPrice.innerHTML = (amount*productPrice + '$').toString();
                  basketInfoProd.innerHTML = 'Products:' + amount.toString();
                  basketInfoTotal.innerHTML = ('Total:' + amount*productPrice + '$').toString();
               }else if(target.classList.contains('basket_button-minus')){
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
               }
            
         });
         
      })
      // buttonPlus.forEach((item) => {
      //    item.addEventListener('click', () => {
      //    console.log('test')
      //    amount++
      //    productAmount.innerHTML = amount.toString();
      //    basketProductPrice.innerHTML = (amount*productPrice + '$').toString();
      //    basketInfoProd.innerHTML = 'Products:' + amount.toString();
      //    basketInfoTotal.innerHTML = ('Total:' + amount*productPrice + '$').toString();
      // })
      // })
      // buttonMinus.forEach((item) => {
      // item.addEventListener('click', () => {
      // console.log('test')
      //  amount--
      //  basketProductPrice.innerHTML = (amount*productPrice + '$').toString()
      //  basketInfoProd.innerHTML = 'Products:' + amount.toString();
      //  basketInfoTotal.innerHTML = ('Total:' + amount*productPrice + '$').toString();
      //  if(amount <= 0) {
      //    basketProductPrice.innerHTML = '0$'
      //    basketInfoProd.innerHTML = 'Products: 0'
      //    basketInfoTotal.innerHTML = 'Total: 0$'
      //    productAmount.innerHTML = '0';
      //    return amount=0;
      //  }
      //  productAmount.innerHTML = amount.toString()
      //  return amount
      // })
      // })
      return amount
   }
   
 render() {
   this.basketStructure(); 
   this.pagination();
   this.formValidation(); 
   this.getBasketInfo();
    return this.container;
  }
}
export default Basket;

function replace(arg0: RegExp, arg1: string): any {
   throw new Error('Function not implemented.');
}
