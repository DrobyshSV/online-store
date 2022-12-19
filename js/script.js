const products = document.querySelector('.products')
const testie = document.querySelector('.filters');

class Product{
   constructor(name, img, description){
      this.name = name;
      this.img = img;
      this.description = description;
   }
   show(){
      `
      <div class = "products__name">${this.name}</div>
      <div class = "products__"img><img src="${this.img}" alt="test"></img></div>
      <div class = "products__description">${this.description}</div>
      <div class = "products__other">o o o</div>
   `
   }
}

function elementFromHtml(html) {
   const container = document.createElement('div');
   const template = document.createElement('template');
   container.classList.add('products__item');
   products.append(container)
   template.innerHTML = html
   return container.append(template.content.cloneNode(true))
}

/// FETCH ====================

function getProduct(data) {
   const phoneName = data.products[1].title;
   const phoneImg = data.products[1].images[0];
   const phoneDescription = data.products[1].description

   const stucture = `
      <div class = "products__name">${phoneName}</div>
      <div class = "products__"img><img src="${phoneImg}" alt="test"></img></div>
      <div class = "products__description">${phoneDescription}</div>
      <div class = "products__other">o o o</div>
   `;
   elementFromHtml(stucture);
   elementFromHtml(stucture);
   const newProd = new Product(phoneName, phoneImg, phoneDescription)
   elementFromHtml(newProd.show());
}