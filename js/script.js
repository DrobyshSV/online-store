const products = document.querySelector('.products')

const myList = elementFromHtml(`
      <div class = "products__name">Iphone</div>
      <div class = "products__"img><img src="./assets/shopping-cart.svg" alt="test"></img></div>
      <div class = "products__description">Colour: Blue<br>Screen: 6.6"<br>Release: 2022<br>Cameras quantity: 4<br>In stock: 18</div>
      <div class = "products__other">o o o</div>
`);
const myListTwo = elementFromHtml(`
   
`);
const myListThree = elementFromHtml(`

`);
const myListFour = elementFromHtml(`

`);
const myListFive = elementFromHtml(`

`);
const myListSix = elementFromHtml(`

`);
const myListSeven = elementFromHtml(`

`);
const myListEight = elementFromHtml(`

`);
function elementFromHtml(html) {
   const container = document.createElement('div');
   const template = document.createElement('template');

   container.classList.add('products__item');
   products.append(container)
   template.innerHTML = html.trim()
   return container.append(template.content.cloneNode(true))
}