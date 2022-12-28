import './Filters.scss';

let arr = ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration', 'furniture', 'tops',
  'womens-dresses', 'womens-shoes', 'mens-shirts', 'mens-shoes', 'mens-watches', 'womens-watches', 'womens-bags',
  'womens-jewellery', 'sunglasses', 'automotive', 'motorcycle', 'lighting'];
let arr1 = ['Apple', 'Samsung', 'OPPO', 'Huawei', 'APPle', 'Microsoft Surface', 'Infinix', 'HP Pavilion',
  'Impression of Acqua Di Gio', 'Royal_Mirage', 'Fog Scent Xpressio', 'Al Munakh', 'Lord - Al-Rehab', 'L\'Oreal Paris',
  'Hemani Tea', 'Dermive', 'ROREC White Rice', 'Fair & Clear', 'Saaf & Khaas', 'Bake Parlor Big', 'Baking Food Items',
  'fauji', 'Dry Rose', 'Boho Decor', 'Flying Wooden', 'LED Lights', 'luxury palace', 'Golden', 'Furniture Bed Set',
  'Ratttan Outdoor', 'Kitchen Shelf', 'Multi Purpose', 'AmnaMart', 'Professional Wear', 'Soft Cotton', 'Top Sweater',
  'RED MICKY MOUSE..', 'Digital Printed', 'Ghazi Fabric', 'IELGY', 'IELGY fashion', 'Synthetic Leather',
  'Sandals Flip Flops', 'Maasai Sandals', 'Arrivals Genuine', 'Vintage Apparel', 'FREE FIRE', 'The Warehouse',
  'Sneakers', 'Rubber', 'Naviforce', 'SKMEI 9117', 'Strap Skeleton', 'Stainless', 'Eastern Watches', 'Luxury Digital',
  'Watch Pearls', 'Bracelet', 'LouisWill', 'Copenhagen Luxe', 'Steal Frame', 'Darojay', 'Fashion Jewellery',
  'Cuff Butterfly', 'Designer Sun Glasses', 'mastar watch', 'Car Aux', 'W1209 DC12V', 'TC Reusable', 'Neon LED Light',
  'METRO 70cc Motorcycle - MR70', 'BRAVE BULL', 'shock absorber', 'JIEPOLLY', 'Xiangle', 'lightingbrilliance',
  'Ifei Home', 'DADAWU', 'YIOSI'];

class Filters {
  private container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
  }

  getCheckbox(array: Array<string>) {
    const divFilterList = document.createElement('div');
    divFilterList.classList.add('filter-list');
    array.forEach(el => {
      const div = document.createElement('div');
      div.classList.add('checkbox-line');
      const input = document.createElement('input');
      input.classList.add('checkbox__input');
      input.setAttribute('type', 'checkbox');
      input.id = el + '/';
      const label = document.createElement('label');
      label.classList.add('checkbox__label');
      label.setAttribute('for', el);
      label.textContent = el;
      const span = document.createElement('span');
      span.textContent = '(5/5)';
      div.append(input, label, span);
      divFilterList.append(div);
    });
    return divFilterList;
  }

  addFilterDiv(type: string, array: Array<string>) {
    const div = document.createElement('div');
    div.classList.add(type);
    const h3 = document.createElement('h3');
    h3.textContent = type;
    div.append(h3, this.getCheckbox(array));
    return div;
  }

  init() {
    this.container.append(this.addFilterDiv('category', arr));
    this.container.append(this.addFilterDiv('brand', arr1));
    return this.container;
  }
}

export default Filters;
