import ProductsLoader from './ProductsLoader';

const url = 'https://dummyjson.com/';
/*const limit = '100';*/

class AppLoader extends ProductsLoader {
  constructor(/*search = ''*/) {
    super(url, {
      /*search: search,*/
      /*limit: limit, // лимит продуктов*/
    });
  }
}

export default AppLoader;
