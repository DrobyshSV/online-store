import './payment.css'
import ProductPage from '../pages/product/ProductPage';

class Payment extends ProductPage{
   async payment(){
   const popUp = `
      <div class = "popup__pay">
        <div class = "pay__popup__body">
          <div class = "pay__popup__content">
              <h3>Personal details</h3>
              <form class="pay__form" action="" novalidate >
                  <input type="text" class="input pay__input pay__input-name" name="name" placeholder="Name">
                  <input type="tel" class="input pay__input pay__input-phone" name="phone" placeholder="Phone number">
                  <input type="text" class="input pay__input pay__input-adress" name="address" placeholder="Address">
                  <input type="email" class="input pay__input pay__input-email" name="email" placeholder="Email">
                  <h3>Credict card details</h3>
                  <input type="text" class="input pay__input pay__input-card" name="card" placeholder="Card">
                  <input type="text" class="input pay__input pay__input-valid" name="valid" placeholder="Valid thru">
                  <input type="text" class="input pay__input pay__input-cvv" name="cvv" placeholder="cvv">
                  <button type="submit" class="btn">Submit</button>    
            </form>
              <a href = "#" class = "pay__popup__close">X</a>
          </div>
        </div>
      </div>
    `
    this.container.innerHTML = popUp;
}
  async setEvents(){
    const payPopupBody = this.container.querySelector('.pay__popup__body') as HTMLElement;
    const closeButton = this.container.querySelector('.pay__popup__close') as HTMLElement;
    const form = this.container.querySelector('.pay__form') as HTMLElement,
        formInputs = this.container.querySelectorAll('.pay__input'),
        inputEmail = this.container.querySelector('.pay__input-email') as HTMLFormElement,
        inputName = this.container.querySelector('.pay__input-name') as HTMLFormElement,
        inputAdress = this.container.querySelector('.pay__input-adress') as HTMLFormElement,
        inputPhone = this.container.querySelector('.pay__input-phone') as HTMLFormElement,
        inputValid = this.container.querySelector('.pay__input-valid') as HTMLFormElement,
        inputCvv = this.container.querySelector('.pay__input-cvv') as HTMLFormElement,
        inputCard = this.container.querySelector('.pay__input-card') as HTMLFormElement;
    
    form.onsubmit = () => {
      let emailVal: string = inputEmail.value,
          phoneVal: string = inputPhone.value,
          adressVal:string = inputAdress.value,
          nameVal: string = inputName.value,
          cardVal: string = inputCard.value,
          validVal: string = inputValid.value,
          cvvVal: string = inputCvv.value,
          emptyInputs = Array.from(formInputs).filter(input => (input as HTMLTextAreaElement).value === '');

      const isValidName = (name: string) => {
        let result = /^[A-Za-zА-Яа-яЁё]{2,100}(\s+[A-Za-zА-Яа-яЁё]{2,100})$/;
        return result.test(String(name).toLowerCase());
      }

      const isValidPhone = (phone: string) => {
        let result = /^(\+)[0-9]{9,14}$/;
        return result.test(String(phone).toLowerCase());
      }

      const isValidAdress = (adress: string) => {
        let result = /^[A-Za-zА-Яа-яЁё]{5,100}(\s+[A-Za-zА-Яа-яЁё]{5,100})(\s+[A-Za-zА-Яа-яЁё]{5,100})$/;
        return result.test(String(adress).toLowerCase());
      }
      
      const isValidEmail = (email: string) => {
        let result = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return result.test(String(email).toLowerCase());
      }

      const isValidCard = (card: string) => {
        let result = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
        return result.test(String(card).toLowerCase());
      }
      
      const isValidValid = (valid: string) => {
        let result = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return result.test(String(valid).toLowerCase());
      }

      const isValidCvv = (cvv: string) => {
        let result = /^[0-9]{3}$/;
        return result.test(String(cvv).toLowerCase());
      }

      formInputs.forEach(input => {
         if((input as HTMLTextAreaElement).value === ''){
          input.classList.add('error');
        }else{
          input.classList.remove('error');
        }
      });

      if(emptyInputs.length !== 0){
        console.log('Please enter a valid value');
        return false;
      }

      if(!isValidName(nameVal)){
        console.log('Please enter a valid name');
        inputName.classList.add('error');
        return false;
      }else{
        inputName.classList.remove('error');
      }

      if(!isValidPhone(phoneVal)){
        console.log('Please enter a valid phone number');
        inputPhone.classList.add('error');
        return false;
      }else{
        inputPhone.classList.remove('error');
      }

      if(!isValidAdress(adressVal)){
        console.log('Please enter a valid adress');
        inputAdress.classList.add('error');
        return false;
      }else{
        inputAdress.classList.remove('error');
      }

      if(!isValidEmail(emailVal)){
        console.log('Please enter a valid email');
        inputEmail.classList.add('error');
        return false;
      }else{
        inputEmail.classList.remove('error');
      } 

      if(!isValidCard(cardVal)){
        console.log('Please enter a valid card');
        inputCard.classList.add('error');
        return false;
      }else{
        inputCard.classList.remove('error');
      } 

      if(!isValidValid(validVal)){
        console.log('Please enter a valid date');
        inputValid.classList.add('error');
        return false;
      }else{
        inputValid.classList.remove('error');
      } 

      if(!isValidCvv(cvvVal)){
        console.log('Please enter a valid cvv');
        inputCvv.classList.add('error');
        return false;
      }else{
        inputCvv.classList.remove('error');
      } 

    }
    
    // payPopupBody.addEventListener('click', () =>{
    //   const popUpPay = document.querySelector('.popup__pay') as HTMLElement;;
    //   popUpPay.classList.remove('open');
    // })
    closeButton.addEventListener('click', (e) =>{
      const popUpPay = document.querySelector('.popup__pay') as HTMLElement;;
      popUpPay.classList.remove('open');
      e.preventDefault();
    })
   
  }

  render() {
    this.payment();
    this.setEvents();
    return this.container;
  }
}
export default Payment;