import './payment.css'
import Page from '../common/Page';

class Payment extends Page{
   static TextObject = {
    MainTitle: 'Settings Page',
  };

  constructor(id: string) {
    super(id);
  }

  test(){
   let gilt = document.createElement('h1');
   gilt.innerHTML = 'Settings';
   this.container.append(gilt)
   console.log(gilt)
  }

  render() {
    this.test();
    return this.container;
  }
}
export default Payment;