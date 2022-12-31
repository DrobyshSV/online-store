import './payment.css'
import ProductPage from '../pages/product/ProductPage';

class Payment extends ProductPage{
   async payment(){
   const popUp = `
      <div class = "popup__pay">
        <div class = "pay__popup__body">
          <div class = "pay__popup__content">
            <div class = "pay__form__wrapper">
              <h3>Personal details</h3>
              <form action="" class="pay__form" id="add__pay__form">
                <input type="text" class="input__field" placeholder="Name">
                <input type="text" class="input__field" placeholder="Phone number">
                <input type="text" class="input__field" placeholder="Delivery address">
                <input type="text" class="input__field" placeholder="E-mail">
                <input type="text" class="input__field" placeholder="Card number">
                <input type="text" class="input__field" placeholder="Valid Thru">
                <input type="text" class="input__field" placeholder="Code">
                <button type="submit" class="submit__button">Send</button>
              </form>
              <h3>Personal details</h3>
              <a href = "#" class = "pay__popup__close">X</a>
            </div>
          </div>
        </div>
      </div>
    `
    this.container.innerHTML = popUp;
}
  

  render() {
    this.payment();
   
    return this.container;
  }
}
export default Payment;